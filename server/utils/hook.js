const { createSubAccount } = require("./paystack");
const { generateRandomSixDigitNumber } = require("./random");
const { sendSMS } = require("./communication");
const { validatePhoneNumber } = require("./phoneLookUp");

module.exports = {
  updateUserRoleAndSecretKey: async (requests, userId) => {
    console.log("user id in hook", userId);
    const transaction = await requests.sequelize.transaction();

    try {
      const user = await requests.sequelize.models.Users.findOne({
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

      console.log("user role updated", user.role);

      const updatedUser = await user.save({ transaction });
      console.log("updated User in the hook", updatedUser);
      if (!updatedUser) {
        throw new Error("Failed to update user role");
      }
      console.log("phone number", user.phone_number);

      // Create a subaccount for the user
      const carrier = await validatePhoneNumber(user.phone_number);
      console.log("carrier", carrier);
      if (!carrier) {
        await sendSMS(
          user.phone_number,
          `Your phone number should be either from MTN Ghana or Vodafone`
        );
        throw new Error("Invalid phone number");
      }
      const newSubAccount = await createSubAccount(
        user.name,
        carrier,
        user.phone_number,
        5
      );
      console.log("sub account in the hook", newSubAccount);

      if (!newSubAccount || newSubAccount.status !== true) {
        throw new Error("Failed to create subaccount");
      }

      // Update the user's secret key with the subaccount code
      user.secretKey = newSubAccount.data.subaccount_code;
      console.log("secret key ", user.secretKey);
      console.log("sub account secret key in the hook", user.secretKey);
      await user.save({ transaction });

      // Commit the transaction
      await transaction.commit();
      await sendSMS(
        user.phone_number,
        `You have successfully been made a Planner. You can now post your events and also recieve payments on payable events`
      );

      console.log(
        `User role updated to Planner for userID: ${user.userID} and subaccount created`
      );
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      console.error("Error updating user role and creating subaccount:", error);
    }
  },
  updateEventAttendeesAndUserEvent: async (requests, userID, eventID) => {
    console.log("userID in the update-Event-Attendees", userID);
    console.log("eventID in the update-Event-Attendees", eventID);

    const transaction = await requests.sequelize.transaction();
    try {
      const user = await requests.sequelize.models.Users.findOne({
        where: { userID },
        transaction,
      });
      if (!user) {
        console.log("User not found");
        await transaction.rollback();
        return;
      }

      const event = await requests.sequelize.models.Events.findOne({
        where: { eventID },
        transaction,
      });
      if (!event) {
        console.log("Event not found");
        await transaction.rollback();
        return;
      }

      const updatedEvent = await event.update(
        {
          attendeeList: event.attendeeList
            ? event.attendeeList.length === 0
              ? [user.userID]
              : [...event.attendeeList, user.userID]
            : [user.userID],
          numberOfAttendees: event.numberOfAttendees - 1,
        },
        { transaction }
      );

      const updatedUser = await user.update(
        {
          events: user.events
            ? user.events.length === 0
              ? [event.eventID]
              : [...user.events, event.eventID]
            : [event.eventID],
        },
        { transaction }
      );

      if (!updatedEvent || !updatedUser) {
        console.log("Failed to update event or user");
        await transaction.rollback();
        return;
      }

      const code = generateRandomSixDigitNumber();
      const ticket = await requests.sequelize.models.Tickets.create(
        {
          userID: user.userID,
          eventID: event.eventID,
          category: event.price?.category || null,
          code,
        },
        { transaction }
      );

      if (!ticket) {
        console.log("Failed to create ticket");
        await transaction.rollback();
        return;
      }

      const smsSent = await sendSMS(
        user.phone_number,
        `This is your ticket code ${code}. Please do not share this code with anyone as it will be used to identify you`
      );

      await transaction.commit();
      console.log("Transaction committed successfully");
    } catch (error) {
      console.error("An error occurred during the transaction:", error);
      await transaction.rollback();
    }
  },
};
