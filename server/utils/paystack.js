const https = require("https");
require("dotenv").config();

const BASE_OPTIONS = {
  hostname: "api.paystack.co",
  port: 443,
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
};

module.exports = {
  initializeTransaction: (email, amount, subaccount) => {
    return new Promise((resolve, reject) => {
      const params = JSON.stringify({
        email: email,
        amount: amount,
        subaccount,
      });

      const options = {
        ...BASE_OPTIONS,
        path: "/transaction/initialize",
        method: "POST",
      };

      const req = https
        .request(options, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        })
        .on("error", (error) => {
          reject(error);
        });

      req.write(params);
      req.end();
    });
  },

  totalDonations: () => {
    return new Promise((resolve, reject) => {
      const options = {
        ...BASE_OPTIONS,
        path: "/transaction/totals",
        method: "GET",
      };

      const req = https
        .request(options, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        })
        .on("error", (error) => {
          reject(error);
        });

      req.end();
    });
  },

  createSubAccount: (
    business_name, //username
    settlement_bank, //name of telecom network
    account_number, //mobile money number
    percentage_charge
  ) => {
    return new Promise((resolve, reject) => {
      const params = JSON.stringify({
        business_name,
        settlement_bank,
        account_number,
        percentage_charge,
      });

      const options = {
        ...BASE_OPTIONS,
        path: "/subaccount",
        method: "POST",
      };

      const req = https
        .request(options, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        })
        .on("error", (error) => {
          reject(error);
        });

      req.write(params);
      req.end();
    });
  },
};
