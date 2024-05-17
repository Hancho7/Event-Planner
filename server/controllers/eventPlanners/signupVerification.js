const { Op } = require("sequelize");
const db = require("../../models");
const { responseMiddleware } = require("../../utils/response");
const { Planners, Tokens } = db;

const signupVerification = async (req, res) => {
  const { plannerID, tokenLink } = req.params;
  const { smsCode } = req.body;

  try {
    const transaction = await db.sequelize.transaction();

    const planner = await Planners.findOne({
      where: { planner_id: plannerID },
      transaction,
    });
    if (!planner) {
      await transaction.rollback();
      return responseMiddleware(
        res,
        400,
        "This ID does not correspond with any user",
        null,
        "Error"
      );
    }

    const token = await Tokens.findOne({
      where: {
        [Op.and]: {
          plannerID,
          tokenLink,
          smsCode,
        },
      },
      transaction,
    });

    if (!token) {
      await transaction.rollback();
      return responseMiddleware(res, 400, "Invalid Token", null, "Error");
    }

    const [updatedCount] = await Planners.update(
      { verified: true },
      { where: { planner_id: plannerID }, transaction }
    );

    if (updatedCount !== 1) {
      await transaction.rollback();
      return responseMiddleware(res, 400, "Error Updating user", null, "Error");
    }

    const deletedToken = await Tokens.destroy({
      where: {
        plannerID,
        tokenLink,
        smsCode,
      },
      transaction,
    });

    if (!deletedToken) {
      await transaction.rollback();
      return responseMiddleware(
        res,
        400,
        "Error Deleting token",
        null,
        "Error"
      );
    }

    await transaction.commit();
    return responseMiddleware(
      res,
      200,
      "User Verified Successfully",
      null,
      "Success"
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    if (error instanceof Error) {
      return responseMiddleware(res, 400, error.message, null, "Error");
    }
    return responseMiddleware(res, 400, "Error Verifying User", null, "Error");
  }
};

module.exports = { signupVerification };
