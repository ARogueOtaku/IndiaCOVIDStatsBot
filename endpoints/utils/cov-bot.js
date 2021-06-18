const { Telegraf, Markup } = require("telegraf");
const { getLatestVaccineData } = require("./cov-data");
const { getFormattedVaccineData } = require("./general-util");

const covBot = new Telegraf(process.env.BOT_TOKEN);

covBot.command("ping", async (ctx) => {
  await ctx.reply("Hello, I'm there! 🙂");
});

covBot.command("keys", async (ctx) => {
  await ctx.reply(
    "Choose 1 from Below:",
    Markup.inlineKeyboard([
      [Markup.button.callback("Say Hello!", "action-hello")],
      [Markup.button.callback("Say bye!", "action-bye")],
    ])
  );
});

covBot.action("action-hello", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Hello!");
});

covBot.action("action-bye", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Bye!");
});

covBot.command("vaccine", async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const messageArray = ctx.message.text.split(" ");
  messageArray.shift();
  const state = messageArray.join(" ");
  const vaccineData = await getLatestVaccineData(state).catch(async (err) => {
    console.log(err);
    await ctx.replyWithHTML(`<strong>❌ Could not Fetch Vaccine Data for State: </strong>${state}`);
  });
  if (vaccineData) await ctx.replyWithHTML(getFormattedVaccineData(vaccineData));
});

module.exports = { covBot };
