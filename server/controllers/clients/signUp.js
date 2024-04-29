const { Op, where } = require("sequelize");
const db = require("../../models");
const { sendEmail, sendSMS } = require("../../utils/communication");
const { responseMiddleware } = require("../../utils/response");
const { hashText } = require("../../utils/bcrypt");
const generateRandomSixDigitNumber = require("../../utils/randomNumbers");
const crypto = require("crypto");
const { Clients, Tokens } = db;

//Function to validate the entries
function validateSignUpData(reqBody) {
  const { name, email, phone_number, password } = reqBody;
  if (!name || !email || !phone_number || !password) {
    return "Missing fields";
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

// Function to check if a user with the given email or phone number already exists
async function userExists(email, phoneNumber, transaction) {
  return await Clients.findOne({
    where: {
      [Op.or]: {
        email: email,
        phone_number: phoneNumber,
      },
    },
    transaction,
  });
}

// Function to create a new user
async function createUser(name, email, phoneNumber, password, transaction) {
  const hashedPassword = await hashText(password, 10);
  return await Clients.create(
    {
      name,
      email,
      phone_number: phoneNumber,
      password: hashedPassword,
    },
    { transaction }
  );
}

// Function to generate verification token
async function generateVerificationToken(clientID, transaction) {
  return await Tokens.create(
    {
      clientID,
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
  clientID
) {
  let formattedPhoneNumber;
  if (typeof phoneNumber === "string") {
    formattedPhoneNumber = `233${phoneNumber.slice(1)}`;
  } else {
    formattedPhoneNumber = `233${phoneNumber.toString().slice(1)}`;
  }
  const url = `http://localhost:5001/clients/${clientID}/${token.tokenLink}`;

  try {
    // Send email
    const messageSent = await Promise.all([
      sendEmail(email, "VERIFICATION EMAIL", "clientVerification.ejs", {
        clientName: name,
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

// Function to handle user sign-up
async function signup(req, res) {
  console.log("req.body", req.body);
  const { name, email, phone_number, password } = req.body;

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
    const existingUser = await userExists(email, phone_number, transaction);
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
        //Check if his token has not yet been deleted and send it back
        const token = await Tokens.findOne({
          where: { clientID: existingUser.client_id },
        });
        if (token) {
          await sendVerificationMessages(
            existingUser.name,
            existingUser.email,
            existingUser.phone_number,
            token,
            existingUser.client_id
          );
          return responseMiddleware(
            res,
            200,
            "Verification messages has been sent to phone and email",
            null,
            "success"
          );
        }
        const newToken = await generateVerificationToken(
          existingUser.client_id,
          transaction
        );
        await sendVerificationMessages(
          existingUser.name,
          existingUser.email,
          existingUser.phone_number,
          newToken,
          existingUser.client_id
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
      newUser.client_id,
      transaction
    );
    // Inside the signUp function
    const sendResult = await sendVerificationMessages(
      newUser.name,
      newUser.email,
      newUser.phone_number,
      token,
      newUser.client_id
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
      "User created successfully. Verification link has been sent"
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
