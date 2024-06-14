const { Op } = require("sequelize");
const db = require("../../models");
const { Users, Events } = db;
const { saveToBucket } = require("../../utils/bucket");
const { responseMiddleware } = require("../../utils/response");

const createEvents = async (req, res) => {
  const {
    plannerID,
    name,
    location,
    startOfDate,
    endOfDate,
    bookingDeadline,
    numberOfAttendees,
    price,
  } = req.body;

  const images = req.files;

  // Start a transaction
  const transaction = await db.sequelize.transaction();

  try {
    const newNumberOfAttendees = numberOfAttendees || null;
    // Check if the user exists and is a planner
    const user = await Users.findOne({
      where: { [Op.and]: [{ userID: plannerID }, { role: "Planner" }] },
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return responseMiddleware(res, 400, "User not found");
    }

    // Save images to bucket and get their links
    const savedImageLinks = [];
    for (const image of images) {
      const imageLink = await saveToBucket(image);
      savedImageLinks.push(imageLink);
    }

    // Create the event
    const newEvent = await Events.create(
      {
        plannerID,
        name,
        location,
        startOfDate,
        endOfDate,
        bookingDeadline,
        price: price || null,
        numberOfAttendees: newNumberOfAttendees,
        images: savedImageLinks,
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();
    return responseMiddleware(
      res,
      200,
      "Event created successfully",
      newEvent,
      "Success"
    );
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    return responseMiddleware(res, 500, error.message, null, "Server Error");
  }
};

module.exports = { createEvents };
