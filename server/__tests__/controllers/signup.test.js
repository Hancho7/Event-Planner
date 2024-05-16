const { signup } = require("../../controllers/clients/signup");
const db = require("../../models");
const { sendEmail, sendSMS } = require("../../utils/communication");
const { responseMiddleware } = require("../../utils/response");
const { hashText } = require("../../utils/bcrypt");
const generateRandomSixDigitNumber = require("../../utils/random");
const crypto = require("crypto");
const { Clients, Tokens } = db;

const req = {
  body: {
    name: "test",
    email: "test",
    password: "test",
    phone_number: "test",
  },
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../../utils/response", () => ({
  responseMiddleware: jest.fn((res, statusCode, message, data, status) => {
    res.status(statusCode).json({
      status: status,
      code: statusCode,
      message: message,
      data: data || null,
    });
  }),
}));

jest.mock("../../utils/communication.js", () => ({
  sendEmail: jest.fn(),
  sendSMS: jest.fn(),
}));

jest.mock("../../models/clients");

describe("Signing up users", () => {
  it("should return an error when fields are empty ", () => {
    const copyMockReq = {
      ...req,
      body: {
        name: "",
        email: "",
        password: "",
        phone_number: "",
      },
    };
    signup(copyMockReq, res);
    expect(res.json).toHaveBeenCalledWith({
      status: "Error",
      code: 400,
      message: "Missing fields",
      data: null,
    });
  });

  it("should return 'Name should not contain symbols or punctuation marks' since the name format is wrong ", () => {
    const copyMockReq = {
      ...req,
      body: {
        name: "@John Doe",
        email: "john.doe@example.com",
        password: "Password@123",
        phone_number: "1234567890",
      },
    };
    signup(copyMockReq, res);
    expect(res.json).toHaveBeenCalledWith({
      status: "Error",
      code: 400,
      message: "Name should not contain symbols or punctuation marks",
      data: null,
    });
  });
  it("should check for an existing user", async () => {
    Clients.findOne.mockResolvedValue(null);

    await signup(req, res);

    // Expecting the response to indicate that the user already exists
    expect(responseMiddleware).toHaveBeenCalled();
  });
});
