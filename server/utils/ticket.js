const { generateRandomSixDigitNumber } = require("./random");
const db = require("../models");
const { where, Op } = require("sequelize");
const { genericResponse } = require("./response");
const { sendSMS } = require("./communication");
const { Events, Users, Tickets } = db;

module.exports = {
  generateTickets: async (userID, eventID, category) => {
    try {
      const user = await Users.findOne({ where: { userID } });
      if (!user) {
        return genericResponse(404, "User not found", null, "Error");
      }
      const event = await Events.findOne({ where: { eventID } });
      if (!event) {
        return genericResponse(404, "Event not found", null, "Error");
      }
      const ticket = await Tickets.findOne({
        where: { [Op.and]: [{ userID }, { eventID }] },
      });
      if (ticket) {
        return genericResponse(
          400,
          "User already has a ticket for this event",
          null,
          "Error"
        );
      }
      const code = generateRandomSixDigitNumber();
      const newCategory = category || null;
      const newTicket = await Tickets.create({
        userID,
        eventID,
        category: newCategory,
        code,
      });
      if (!newTicket) {
        return genericResponse(500, "Error creating ticket", null, "Error");
      }
      const updateEventAttendeeList = await Events.update({
        attendees: [...event.attendees, user.id],
      });
      if (!updateEventAttendeeList) {
        return genericResponse(
          500,
          "Error updating event attendee list",
          null,
          "Error"
        );
      }

      const messageSent = await sendSMS(
        user.phone_number,
        `You have been added as an attendee to ${event.name} event
         and this is your code ${code}.
          Please make sure not to share this code with anybody 
          as it will be used to identify you at the entrance`
      );
      console.log("message sent", messageSent);

      return genericResponse(200, "Ticket generated", newTicket, "Success");
    } catch (error) {
      return genericResponse(
        500,
        "Error Creating Ticket",
        null,
        "Server Error"
      );
    }
  },
};
