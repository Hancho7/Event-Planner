const db = require("../../models");
const { Op } = require("sequelize");
const { sendEmail, sendSMS } = require("../../utils/communication");
const { responseMiddleware } = require("../../utils/response");
const { signupSchema } = require("../../schemas/signup");
const { hashText } = require("../../utils/bcrypt");
const { generateRandomSixDigitNumber } = require("../../utils/random");
const crypto = require("crypto");
const { Users, Tokens } = db;

// Function to validate the entries
function validateSignUpData(reqBody) {
  const result = signupSchema.validate(reqBody);
  console.log("result", result);
  if (result.error) {
    return result.error.details[0].message;
  }
  return null;
}

// Function to check if a planner with the given email or phone number already exists
async function userExists(email, phone_number, transaction) {
  return await Users.findOne({
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
  transaction
) {
  

  const hashedPassword = await hashText(password, 10);
  return await Users.create(
    {
      name,
      email,
      phone_number,
      password: hashedPassword,
    },
    { transaction }
  );
}

// Function to generate verification token
async function generateVerificationToken(userID, transaction) {
  return await Tokens.create(
    {
      userID,
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
  userID
) {
  let formattedPhoneNumber;
  if (typeof phoneNumber === "string") {
    formattedPhoneNumber = `233${phoneNumber.slice(1)}`;
  } else {
    formattedPhoneNumber = `233${phoneNumber.toString().slice(1)}`;
  }
  const url = `http://localhost:5001/event-Users/${userID}/${token.tokenLink}`;

  try {
    // Send email
    const messageSent = await Promise.all([
      sendEmail(email, "VERIFICATION EMAIL", "eventPlannerVerification.ejs", {
        userName: name,
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

  console.log("request file", req.file);

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
    const existingUser = await userExists(
      email,
      phone_number,
      transaction
    );
    console.log("existingUser", existingUser);
    if (existingUser) {
      if (existingUser.verified) {
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
          where: { userID: existingUser.userID },
        });
        console.log("existingUser.planner_id", existingUser.planner_id);
        if (token) {
          await sendVerificationMessages(
            existingUser.name,
            existingUser.email,
            existingUser.phone_number,
            token,
            existingUser.userID
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
          existingUser.userID,
          transaction
        );
        await sendVerificationMessages(
          existingUser.name,
          existingUser.email,
          existingUser.phone_number,
          newToken,
          existingUser.userID
        );
        // Commit transaction
        await transaction.commit();
        return responseMiddleware(res, 200, "Verification link has been sent");
      }
    }

    const newUser = await createUser(
      name,
      email,
      phone_number,
      password,
      transaction
    );
    const token = await generateVerificationToken(
      newUser.userID,
      transaction
    );
    // Inside the signUp function
    const sendResult = await sendVerificationMessages(
      newUser.name,
      newUser.email,
      newUser.phone_number,
      token,
      newUser.userID
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
