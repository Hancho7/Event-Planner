const db = require("../models");
const { Payments, Users } = db;
module.exports = {
  updateUserRole: async (requests, userId) => {
    try {
      const user = await requests.sequelize.models.Users.findOne({
        where: { userID: userId },
      });
      if (user) {
        user.role = "Planner";
        await user.save();
        console.log(`User role updated to Planner for userID: ${user.userID}`);
      } else {
        console.log(`User not found for userID: ${userId}`);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  },
};
