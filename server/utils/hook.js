const { createSubAccount } = require("./paystack");
const db = require("../models");
const { Users } = db;

module.exports = {
  updateUserRoleAndSecretKey: async (userId) => {
    console.log("user id in hook", userId);
    const transaction = await db.sequelize.transaction();

    try {
      const user = await Users.findOne({
        where: { userID: userId },
        transaction,
      });
      console.log("User in the hook", user);

      if (!user) {
        console.log(`User not found for userID: ${userId}`);
        await transaction.rollback();
        return;
      }

      // Update the user's role to "Planner"
      user.role = "Planner";

      const updatedUser = await user.save({ transaction });
      console.log("updated User in the hook", updatedUser);
      if (!updatedUser) {
        throw new Error("Failed to update user role");
      }

      // Create a subaccount for the user
      const newSubAccount = await createSubAccount(
        user.name,
        "MTN",
        user.phone_number,
        5
      );
      console.log("sub account in the hook", newSubAccount);

      if (!newSubAccount || newSubAccount.status !== true) {
        throw new Error("Failed to create subaccount");
      }

      // Update the user's secret key with the subaccount code
      user.secretKey = newSubAccount.data.subaccount_code;
      console.log("sub account secret key in the hook", user.secretKey);
      await user.save({ transaction });

      // Commit the transaction
      await transaction.commit();

      console.log(
        `User role updated to Planner for userID: ${user.userID} and subaccount created`
      );
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      console.error("Error updating user role and creating subaccount:", error);
    }
  },
};
