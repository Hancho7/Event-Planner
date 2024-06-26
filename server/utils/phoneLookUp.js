import Numlookupapi from "@everapi/numlookupapi-js";
require("dotenv").config();

export const client = new Numlookupapi(process.env.NUMBERLOOKUP_API_KEY);

export const validatePhoneNumber = async (phoneNumber) => {
  try {
    const response = await client.validate(phoneNumber, {
      country_code: "GH",
    });

    let carrier;
    if (response.carrier === "Scancom plc (MTN Ghana)") {
      carrier = "MTN";
    } else if (response.carrier === "Vodafone Ghana Ltd") {
      carrier = "Vodafone";
    } else {
      carrier = null;
    }

    return carrier;
  } catch (error) {
    console.error("Error validating phone number:", error);
    return null;
  }
};
