const db = require("../../models");
const { Op } = require("sequelize");
const { sendEmail, sendSMS } = require("../../utils/communication");
const { responseMiddleware } = require("../../utils/response");
const { hashText } = require("../../utils/bcrypt");
const { generateRandomSixDigitNumber } = require("../../utils/random");
const crypto = require("crypto");
const { saveToBucket } = require("../../utils/bucket");
const { Planners, Tokens } = db;

// Function to validate the entries
function validateSignUpData(reqBody) {
  const { name, email, phone_number, password } = reqBody;

  if (!name || !email || !phone_number || !password) {
    return "Missing Fields";
  }

  // Regular expression patterns for email and phone number validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/; // Assuming phone numbers are 10 digits
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;

  // Check email format
  if (!emailPattern.test(email)) {
    return "Invalid email format";
  }
  if (!phonePattern.test(phone_number)) {
    return "Invalid phone number format";
  }
  if (/[^\w\s]/.test(name)) {
    return "Name should not contain symbols or punctuation marks";
  }
  if (!passwordPattern.test(password)) {
    return "Password should be 8 or more characters containing symbols, numbers, lowercase and uppercase letters";
  }
  return null;
}

// Function to check if a planner with the given email or phone number already exists
async function plannerExists(email, phone_number, transaction) {
  return await Planners.findOne({
    where: {
      [Op.or]: {
        email: email,
        phone_number: phone_number,
      },
    },
    transaction,
  });
}

// Function to create a new planner
async function createUser(
  name,
  email,
  phone_number,
  password,
  profile_picture,
  transaction
) {
  if (!profile_picture) {
    return;
  }
  const saved_picture = await saveToBucket(profile_picture);
  const hashedPassword = await hashText(password, 10);
  return await Planners.create(
    {
      name,
      email,
      phone_number,
      password: hashedPassword,
      profile_picture: saved_picture.key,
    },
    { transaction }
  );
}

// Function to generate verification token
async function generateVerificationToken(plannerID, transaction) {
  return await Tokens.create(
    {
      plannerID,
      tokenLink: crypto.randomBytes(32).toString("hex"),
      smsCode: generateRandomSixDigitNumber(),
    },
    { transaction }
  );
}

// Function to send verification email and SMS
async function sendVerificationMessages(
  name,
  email,
  phoneNumber,
  token,
  plannerID
) {
  let formattedPhoneNumber;
  if (typeof phoneNumber === "string") {
    formattedPhoneNumber = `233${phoneNumber.slice(1)}`;
  } else {
    formattedPhoneNumber = `233${phoneNumber.toString().slice(1)}`;
  }
  const url = `http://localhost:5001/planners/${plannerID}/${token.tokenLink}`;

  try {
    // Send email
    const messageSent = await Promise.all([
      sendEmail(email, "VERIFICATION EMAIL", "eventPlannerVerification.ejs", {
        eventPlanner: name,
        verificationLink: url,
      }),
      sendSMS(
        formattedPhoneNumber,
        `Your verification code is: ${token.smsCode}`
      ),
    ]);

    console.log("messageSent", messageSent);
    // Return success
    return { success: true };
  } catch (error) {
    console.error("Error sending verification messages:", error);
    // Return failure
    return { success: false, error };
  }
}

// Function to handle planner sign-up
async function signup(req, res) {
  console.log("req.body", req.body);

  const { name, email, phone_number, password } = req.body;
  const profile_picture = req.file;

  const validationError = validateSignUpData({
    name,
    email,
    phone_number,
    password,
  });
  console.log("validationError", validationError);
  if (validationError) {
    return responseMiddleware(res, 400, validationError, null, "Error");
  }

  const transaction = await db.sequelize.transaction(); // Declare transaction variable

  try {
    const existingPlanner = await plannerExists(
      email,
      phone_number,
      transaction
    );
    console.log("existingPlanner", existingPlanner);
    if (existingPlanner) {
      if (existingPlanner.verified) {
        // Rollback transaction
        await transaction.rollback();
        return responseMiddleware(
          res,
          409,
          "This account has already been verified"
        );
      } else {
        // Check if their token has not yet been deleted and send it back
        const token = await Tokens.findOne({
          where: { plannerID: existingPlanner.planner_id },
        });
        if (token) {
          await sendVerificationMessages(
            existingPlanner.name,
            existingPlanner.email,
            existingPlanner.phone_number,
            token,
            existingPlanner.planner_id
          );
          return responseMiddleware(
            res,
            200,
            "Verification messages have been sent to phone and email",
            null,
            "success"
          );
        }
        const newToken = await generateVerificationToken(
          existingPlanner.planner_id,
          transaction
        );
        await sendVerificationMessages(
          existingPlanner.name,
          existingPlanner.email,
          existingPlanner.phone_number,
          newToken,
          existingPlanner.planner_id
        );
        // Commit transaction
        await transaction.commit();
        return responseMiddleware(res, 200, "Verification link has been sent");
      }
    }

    const newPlanner = await createUser(
      name,
      email,
      phone_number,
      password,
      profile_picture,
      transaction
    );
    const token = await generateVerificationToken(
      newPlanner.planner_id,
      transaction
    );
    // Inside the signUp function
    const sendResult = await sendVerificationMessages(
      newPlanner.name,
      newPlanner.email,
      newPlanner.phone_number,
      token,
      newPlanner.planner_id
    );

    if (!sendResult.success) {
      await transaction.rollback();
      return responseMiddleware(
        res,
        500,
        "Failed to send verification messages"
      );
    }

    // Commit transaction
    await transaction.commit();
    return responseMiddleware(
      res,
      200,
      "Planner created successfully. Verification link has been sent"
    );
  } catch (error) {
    if (transaction) {
      // Rollback transaction if an error occurs
      await transaction.rollback();
    }
    if (error instanceof Error) {
      return responseMiddleware(res, 500, error.message);
    }
    console.error("Error occurred during sign-up:", error);
    return responseMiddleware(res, 500, "Internal Server Error");
  }
}

module.exports = { signup };
