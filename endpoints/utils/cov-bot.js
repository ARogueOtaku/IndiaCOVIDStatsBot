const { Telegraf, Markup } = require("telegraf");
const { getLatestVaccineData, states } = require("./cov-data");
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
  if (!state) {
    await ctx.replyWithHTML(
      "<strong>Please Select a state from Below:</strong>",
      Markup.inlineKeyboard(states.map((state) => [Markup.button.callback(state, "vaccine-" + state)]))
    );
    return;
  }
  const vaccineData = await getLatestVaccineData(state).catch(async (err) => {
    console.log(err);
    await ctx.replyWithHTML(`<strong>❌ Could not Fetch Vaccine Data for State: </strong>${state}`);
  });
  if (vaccineData) await ctx.replyWithHTML(getFormattedVaccineData(vaccineData));
});

covBot.on("callback_query", async (ctx) => {
  await ctx.deleteMessage();
  let state = ctx.callbackQuery.data.split("-")[1];
  if (state) await ctx.reply("Data for " + state);
});

module.exports = { covBot };
