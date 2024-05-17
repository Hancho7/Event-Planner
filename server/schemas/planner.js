const Joi = require("joi");

// Define the phone and password patterns
const phonePattern = /^\d{10}$/; // Assuming phone numbers are 10 digits
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;

// Update the Joi schema to include the patterns
const plannerSignupSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  phone_number: Joi.string().pattern(phonePattern).required().messages({
    "any.required": "Phone number is required",
    "string.pattern.base": "Phone number must be 10 digits",
  }),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "any.required": "Password is required",
    "string.pattern.base":
      "Password must be at least 8 characters long and include symbols, numbers, lowercase and uppercase letters",
  }),
});

module.exports = { plannerSignupSchema };
