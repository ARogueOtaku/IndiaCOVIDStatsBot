const { Telegraf } = require("telegraf");
const { getLatestVaccineData } = require("./cov-data");

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
    await ctx.reply("Could not Fetch Data for State: " + state);
  });
  if (!vaccineData)
    await ctx.replyWithHTML(`<strong>${state}</strong>: No Data found!`);
  else {
    let dataHtml = "";
    for (dataPoint in vaccineData) {
      dataHtml += `<strong>${dataPoint}</strong>. ${vaccineData[dataPoint]}\n`;
    }
    await ctx.replyWithHTML(dataHtml);
  }
});

module.exports = { covBot };
