const db = require("../../models");
const { where } = require("sequelize");
const { responseMiddleware } = require("../../utils/response");
const { compareHashes } = require("../../utils/bcrypt");
const { Clients } = db;
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return responseMiddleware(res, 400, "Empty Fields", null, "Error");
  }

  try {
    const client = await Clients.findOne({ where: { email } });
    if (!client) {
      return responseMiddleware(
        res,
        400,
        "This user does not exist",
        null,
        "Error"
      );
    }

    const isPasswordCorrect = await compareHashes(password, client.password);
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
        id: client.client_id,
        email: client.email,
      };

      console.log('session', req.session)

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
