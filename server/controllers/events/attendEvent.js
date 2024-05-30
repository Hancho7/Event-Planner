const { initializeTransaction } = require("../../utils/paystack");
const db = require("../../models");
const { responseMiddleware } = require("../../utils/response");
const { sendEmail, sendSMS } = require("../../utils/communication");
const { Events, Users, Payments } = db;

module.exports = {
  addUserToEvent: async (req, res) => {
    const { eventID, userID, amount } = req.body;
    try {
      // Find the user
      const user = await Users.findOne({ where: { userID } });
      if (!user) {
        return responseMiddleware(res, 404, "User not found", null, "Error");
      }

      // Find the event
      const event = await Events.findOne({ where: { eventID } });
      if (!event) {
        return responseMiddleware(res, 404, "Event not found", null, "Error");
      }

      // If the event has a specified number of attendees
      if (event.numberOfAttendees !== null) {
        // If the event is already full
        if (event.numberOfAttendees === 0) {
          return responseMiddleware(
            res,
            400,
            "Event is already full. Cannot accept more attendees",
            null,
            "Error"
          );
        }

        // If the event is free or if the user has already paid, add the user directly to the attendees array
        if (!event.price) {
          await event.update({
            attendees: [...event.attendees, user.id],
            numberOfAttendees: event.numberOfAttendees - 1,
          });
          return responseMiddleware(
            res,
            200,
            "User added to event attendees",
            null,
            "Success"
          );
        } else {
          const actualAmount = amount * 100;
          const request = await initializeTransaction(user.email, actualAmount);
          if (request.status !== true) {
            return responseMiddleware(
              res,
              400,
              "Payment failed",
              null,
              "Error"
            );
          }
          const saveRequest = await Payments.create({
            userID: user.userID,
            name: user.name,
            email: user.email,
            amount,
            type: "EVENT_TICKET",
            eventID,
            paystack: {
              authorization_url: request.data.authorization_url,
              access_code: request.data.access_code,
              reference: request.data.reference,
            },
          });
          console.log("saveRequest", saveRequest);

          if (!saveRequest) {
            return responseMiddleware(
              res,
              500,
              "Error creating request",
              null,
              "Error"
            );
          }
          console.log("request", request);
          return responseMiddleware(
            res,
            200,
            "Payment initiated successfully",
            { authorization_url: request.data.authorization_url },
            "Success"
          );
        }
      } else {
        // If the event does not have a specified number of attendees
        // Proceed as before
        if (!event.price) {
          await event.update({
            attendees: [...event.attendees, user.id],
          });
          return responseMiddleware(
            res,
            200,
            "User added to event attendees",
            null,
            "Success"
          );
        } else {
          const actualAmount = amount * 100;
          const request = await initializeTransaction(user.email, actualAmount);
          if (request.status !== true) {
            return responseMiddleware(
              res,
              400,
              "Payment failed",
              null,
              "Error"
            );
          }
          const saveRequest = await Payments.create({
            userID: user.userID,
            name: user.name,
            email: user.email,
            amount,
            type: "EVENT_TICKET",
            eventID,
            paystack: {
              authorization_url: request.data.authorization_url,
              access_code: request.data.access_code,
              reference: request.data.reference,
            },
          });
          console.log("saveRequest", saveRequest);

          if (!saveRequest) {
            return responseMiddleware(
              res,
              500,
              "Error creating request",
              null,
              "Error"
            );
          }
          console.log("request", request);
          return responseMiddleware(
            res,
            200,
            "Payment initiated successfully",
            { authorization_url: request.data.authorization_url },
            "Success"
          );
        }
      }
    } catch (error) {
      console.error("Error adding user to event attendees:", error);
      return responseMiddleware(
        res,
        500,
        "Internal server error",
        null,
        "Error"
      );
    }
  },
};
