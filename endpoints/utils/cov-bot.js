const { Telegraf } = require("telegraf");
const { getLatestVaccineData } = require("./cov-data");
const { getFormattedVaccineData } = require("./general-util");

const covBot = new Telegraf(process.env.BOT_TOKEN);

covBot.command("ping", async (ctx) => {
  await ctx.reply("Hello, I'm there! 🙂");
});

covBot.command("vaccine", async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const messageArray = ctx.message.text.split(" ");
  messageArray.shift();
  const state = messageArray.join(" ");
  const vaccineData = await getLatestVaccineData(state).catch(async (err) => {
    console.log(err);
    await ctx.reply("Could not Fetch Vaccine Data for State: " + state);
  });
  await ctx.replyWithHTML(getFormattedVaccineData(vaccineData));
});

module.exports = { covBot };
