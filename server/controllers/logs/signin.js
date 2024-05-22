const db = require("../../models");
const { where } = require("sequelize");
const { responseMiddleware } = require("../../utils/response");
const { compareHashes } = require("../../utils/bcrypt");
const { Users } = db;

const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);
  if (!email || !password) {
    return responseMiddleware(res, 400, "Empty Fields", null, "Error");
  }

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return responseMiddleware(
        res,
        400,
        "This user does not exist",
        null,
        "Error"
      );
    }

    const isPasswordCorrect = await compareHashes(password, user.password);
    if (!isPasswordCorrect) {
      return responseMiddleware(
        res,
        400,
        "Password is incorrect",
        null,
        "Error"
      );
    }

    req.session.user = {
      id: user.userID,
      email: user.email,
      role: user.role,
    };

    console.log("session", req.session);

    return responseMiddleware(res, 200, "Login successfull", null, "Success");
  } catch (error) {
    if (error instanceof Error) {
      return responseMiddleware(res, 500, error.message, null, "Server Error");
    }
    return responseMiddleware(
      res,
      500,
      "An error occurred during email verification",
      null,
      "Server Error"
    );
  }
};
module.exports = { signin };
