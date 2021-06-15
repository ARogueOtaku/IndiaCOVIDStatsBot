require("dotenv").config();
const { covBot } = require("../utils/cov-bot");

exports.handler = async (event) => {
  try {
    await covBot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "Handled Request!" };
  } catch (err) {
    console.log("Error Handling Webhook Request:" + err);
    return {
      statusCode: 400,
      body: "This Endpoint is only for covBot Communication!",
    };
  }
};
