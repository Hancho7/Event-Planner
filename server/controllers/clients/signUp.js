const { Op, sequelize } = require("sequelize");
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

  // Check for missing fields
  if (!name || !email || !phone_number || !password) {
    return "Missing fields";
  }

  // Regular expression patterns for email and phone number validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/; // Assuming phone numbers are 10 digits

  // Regular expression pattern for password validation
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;

  // Check email format
  if (!emailPattern.test(email)) {
    return "Invalid email format";
  }

  // Check phone number format
  if (!phonePattern.test(phone_number)) {
    return "Invalid phone number format";
  }

  // Check name format (should not contain symbols or punctuation marks)
  if (/[^\w\s]/.test(name)) {
    return "Name should not contain symbols or punctuation marks";
  }

  // Check password format (should be 8 or more characters containing symbols, numbers, lowercase and uppercase letters)
  if (!passwordPattern.test(password)) {
    return "Password should be 8 or more characters containing symbols, numbers, lowercase and uppercase letters";
  }

  return null; // Return null if data is valid
}

// Function to check if a user with the given email or phone number already exists
async function userExists(email, phone_number, transaction) {
  return await Clients.findOne({
    where: {
      [Op.or]: {
        email: email,
        phone_number: phone_number,
      },
    },
    transaction,
  });
}

// Function to create a new user
async function createUser(name, email, phone_number, password, transaction) {
  const hashedPassword = await hashText(password);
  return await Clients.create(
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
async function sendVerificationMessages(name, email, phone_number, token) {
  const url = `http://localhost:5001/${clientID}/${token.tokenLink}`;
  await Promise.all([
    sendEmail(email, "eventPlannerVerification.ejs", {
      eventPlanner: name,
      verificationLink: url,
    }),
    sendSMS(phone_number, `Your verification code is: ${token.smsCode}`),
  ]);
}

// Function to handle user sign-up
async function signUp(req, res) {
  console.log("req.body", req.body);
  const { name, email, phone_number, password } = req.body;

  const validationError = validateSignUpData({
    name,
    email,
    phone_number,
    password,
  });
  if (validationError) {
    return responseMiddleware(res, 400, validationError, null, "Error");
  }

  const transaction = await sequelize.transaction(); // Declare transaction variable

  try {
    const existingUser = await userExists(email, phone_number, transaction);
    if (existingUser) {
      if (existingUser.phone_number_verified && existingUser.email_verified) {
        // Rollback transaction
        await transaction.rollback();
        return responseMiddleware(
          res,
          409,
          "This account has already been verified"
        );
      } else {
        const token = await generateVerificationToken(
          existingUser.client_id,
          transaction
        );
        await sendVerificationMessages(name, email, phone_number, token);
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
    await sendVerificationMessages(email, phone_number, token);
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

module.exports = { signUp };
