const { Telegraf, Markup } = require("telegraf");
const { getLatestVaccineData, getAffectedData, states } = require("./cov-data");
const { getFormattedVaccineData, getFormattedStats } = require("./general-util");

const covBot = new Telegraf(process.env.BOT_TOKEN);

covBot.command("ping", async (ctx) => {
  await ctx.reply("Hello, I'm there! 🙂");
});

covBot.command("help", async (ctx) => {
  const helpHtml = `<strong>India COVID-Stats Bot Commands:</strong>

♦<strong>/vaccine: </strong> Get Latest Vaccine Data for an Indian State.
<pre><strong><em>Usage: </em></strong>/vaccine | /vaccine &ltstate&gt</pre>`;

  ctx.replyWithHTML(helpHtml);
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

covBot.command("stats", async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const messageArray = ctx.message.text.split(" ");
  messageArray.shift();
  const state = messageArray.join(" ");
  if (!state) {
    await ctx.replyWithHTML(
      "<strong>Please Select a state from Below:</strong>",
      Markup.inlineKeyboard(states.map((state) => [Markup.button.callback(state, "stat-" + state)]))
    );
    return;
  }
  const affectedData = await getAffectedData(state).catch(async (err) => {
    console.log(err);
    await ctx.replyWithHTML(`<strong>❌ Could not Fetch Stats for State: </strong>${state}`);
  });
  if (affectedData) await ctx.replyWithHTML(getFormattedStats(affectedData));
});

covBot.on("callback_query", async (ctx) => {
  await ctx.deleteMessage();
  const command = ctx.callbackQuery.data.split("-")[0] || "";
  const state = ctx.callbackQuery.data.split("-")[1] || "";
  if (command === "vaccine") {
    const vaccineData = await getLatestVaccineData(state).catch(async (err) => {
      console.log(err);
      await ctx.replyWithHTML(`<strong>❌ Could not Fetch Vaccine Data for State: </strong>${state}`);
    });
    if (vaccineData) await ctx.replyWithHTML(getFormattedVaccineData(vaccineData));
  } else if (command === "stat") {
    const affectedData = await getAffectedData(state).catch(async (err) => {
      console.log(err);
      await ctx.replyWithHTML(`<strong>❌ Could not Fetch Stats for State: </strong>${state}`);
    });
    if (affectedData) await ctx.replyWithHTML(getFormattedStats(affectedData));
  }
});

module.exports = { covBot };
