const db = require("../../models");
const { Events } = db;
const { client } = require("../../db/redis");
const { responseMiddleware } = require("../../utils/response");
const { getFromBucket } = require("../../utils/bucket");

module.exports = {
  getAllEvents: async (req, res) => {
    try {
      client.get("events", (err, events) => {
        if (err) {
          console.error(err);
        }
        if (events !== null) {
          const data = JSON.parse(events);

          console.log("data", data);
          responseMiddleware(
            res,
            200,
            "Events fetched succesfully",
            data,
            "Success"
          );
        }
      });
      const events = await Events.findAll();

      const updateEventsWithImages = async () => {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          const imagePromises = event.images.map(async (image) => {
            const parsedImage = JSON.parse(image);
            return await getFromBucket(parsedImage.key);
          });
          const resolvedImages = await Promise.all(imagePromises);
          event.images = resolvedImages.map((image) => image.url);
        }
      };

      await updateEventsWithImages();

      client.setEx("events", 3600, JSON.stringify(events));

      responseMiddleware(
        res,
        200,
        "Events fetched succesfully",
        events,
        "Success"
      );
    } catch (error) {
      console.log(error);
      responseMiddleware(res, 500, "Error retrieving events", error, "Error");
    }
  },
};
