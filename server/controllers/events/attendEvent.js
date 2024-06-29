const { initializeTransaction } = require("../../utils/paystack");
const db = require("../../models");
const { responseMiddleware } = require("../../utils/response");
const { sendEmail, sendSMS } = require("../../utils/communication");
const { Events, Users, Payments } = db;

async function findUser(userID, transaction) {
  return await Users.findOne({ where: { userID }, transaction });
}

async function findEvent(eventID, transaction) {
  return await Events.findOne({ where: { eventID }, transaction });
}

async function handleFreeEvent(user, event, transaction, res) {
  console.log("user in free event\n", user);
  console.log("event in free event\n", event);

  try {
    const [updatedEvent, updatedUser] = await Promise.all([
      event.update(
        {
          attendeeList: event.attendeeList
            ? event.attendeeList.length === 0
              ? [user.userID]
              : [...event.attendeeList, user.userID]
            : [user.userID],
          numberOfAttendees: event.numberOfAttendees - 1,
        },
        { transaction }
      ),
      user.update(
        {
          events: user.events
            ? user.events.length === 0
              ? [event.eventID]
              : [...user.events, event.eventID]
            : [event.eventID],
        },
        { transaction }
      ),
    ]);

    console.log("updatedEvent in free event\n", updatedEvent);
    console.log("updatedUser in free event\n", updatedUser);

    await sendSMS(
      user.phone_number,
      `You have been added to the attendee list of this event: ${event.name}`
    );

    await transaction.commit();
    return responseMiddleware(
      res,
      200,
      "User added to event attendees",
      null,
      "Success"
    );
  } catch (error) {
    console.error("Error in handleFreeEvent:", error);
    await transaction.rollback();
    return responseMiddleware(res, 500, "Failed to register for event");
  }
}

async function handlePaidEvent(user, event, planner, amount, transaction, res) {
  const actualAmount = amount * 100;
  const request = await initializeTransaction(
    user.email,
    actualAmount,
    planner.secretKey
  );

  if (request.status !== true) {
    await transaction.rollback();
    return responseMiddleware(res, 400, "Payment failed", null, "Error");
  }

  const saveRequest = await Payments.create(
    {
      userID: user.userID,
      name: user.name,
      email: user.email,
      amount,
      type: "EVENT_TICKET",
      eventID: event.eventID,
      paystack: {
        authorization_url: request.data.authorization_url,
        access_code: request.data.access_code,
        reference: request.data.reference,
      },
    },
    { transaction }
  );

  if (!saveRequest) {
    await transaction.rollback();
    return responseMiddleware(
      res,
      500,
      "Error creating request",
      null,
      "Error"
    );
  }

  await transaction.commit();
  return responseMiddleware(
    res,
    200,
    "Payment initiated successfully",
    { authorization_url: request.data.authorization_url },
    "Success"
  );
}

async function addUserToEvent(req, res) {
  const { eventID, userID, amount } = req.body;
  console.log("request body", req.body);
  const transaction = await db.sequelize.transaction();

  try {
    const user = await findUser(userID, transaction);
    if (!user) {
      await transaction.rollback();
      return responseMiddleware(res, 404, "User not found", null, "Error");
    }

    const event = await findEvent(eventID, transaction);
    if (!event) {
      await transaction.rollback();
      return responseMiddleware(res, 404, "Event not found", null, "Error");
    }

    const plannerId = event.plannerID;
    const planner = await Users.findOne({
      where: { userID: plannerId },
      transaction,
    });

    if (event.numberOfAttendees !== null) {
      if (event.numberOfAttendees === 0) {
        await transaction.rollback();
        return responseMiddleware(
          res,
          400,
          "Event is already full. Cannot accept more attendees",
          null,
          "Error"
        );
      }

      if (!event.price) {
        return await handleFreeEvent(user, event, transaction, res);
      } else {
        return await handlePaidEvent(
          user,
          event,
          planner,
          amount,
          transaction,
          res
        );
      }
    } else {
      if (!event.price) {
        await event.update(
          { attendees: [...event.attendees, user.id] },
          { transaction }
        );
        await user.update(
          { event_id: [...user.event_id, event.eventID] },
          { transaction }
        );
        await transaction.commit();
        return responseMiddleware(
          res,
          200,
          "User added to event attendees",
          null,
          "Success"
        );
      } else {
        return await handlePaidEvent(
          user,
          event,
          planner,
          amount,
          transaction,
          res
        );
      }
    }
  } catch (error) {
    await transaction.rollback();
    console.error("Error adding user to event attendees:", error);
    return responseMiddleware(res, 500, "Internal server error", null, "Error");
  }
}

module.exports = {
  addUserToEvent,
};
