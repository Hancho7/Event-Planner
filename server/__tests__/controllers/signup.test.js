const { signUp } = require("../../controllers/clients/signUp");
const db = require("../../models");
const { responseMiddleware } = require("../../utils/response");

const { Clients } = db;

// Mocking the entire clientLogs module
jest.mock("../../controllers/clients/signUp.js", () => ({
  signUp: jest.fn(),
}));

// Mocking individual functions inside the Clients model
jest.mock("../../models", () => ({
  ...jest.requireActual("../../models"), // Use actual implementation of other models
  Clients: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("signUp", () => {
  // Mocking req and res objects
  let req, res;
  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        email: "john@.com",
        phone_number: "1234567890",
        password: "Password123!",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if missing fields", async () => {
    // Define the mock implementation of responseMiddleware
    const responseMiddlewareMock = jest.fn(
      (res, statusCode, message, data, status) => {
        res.status(statusCode).json({
          status: status,
          code: statusCode,
          message: message,
          data: data || null,
        });
      }
    );

    // Replace the original responseMiddleware implementation with the mock implementation
    jest.mock("../../utils/response", () => ({
      responseMiddleware: responseMiddlewareMock,
    }));

    // Mock the behavior of the response middleware
    responseMiddlewareMock.mockReturnValueOnce((res) =>
      res.status(400).json({
        status: "Error",
        code: 400,
        message: "Missing required fields",
        data: null,
      })
    );

    req.body = {}; // Missing fields
    await signUp(req, res);

    // Verify that the response middleware was called with the expected arguments
    expect(responseMiddlewareMock).toHaveBeenCalledWith(
      res,
      400,
      "Missing required fields",
      null,
      "Error"
    );
  });
});
