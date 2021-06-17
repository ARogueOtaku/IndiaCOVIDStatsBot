const { Telegraf } = require("telegraf");
const { getLatestVaccineData } = require("./cov-data");
const { getPercent } = require("./general-util");

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
    //await ctx.reply("Could not Fetch Data for State: " + state);
  });
  if (!vaccineData)
    await ctx.replyWithHTML(`<strong>${state}</strong>: No Data found!`);
  else {
    let dataHtml = `<strong>${
      vaccineData["State"] || state
    } data as Updated On:</strong> ${vaccineData["UpdatedOn"]}\n\n\n`;

    dataHtml += `<strong>Males Vaccinated</strong>: ${
      vaccineData["Male(IndividualsVaccinated)"] || 0
    } [${getPercent(
      vaccineData["Male(IndividualsVaccinated)"] || 0,
      vaccineData["TotalIndividualsVaccinated"] || 0
    )}%].\n`;
    dataHtml += `<strong>Females Vaccinated</strong>: ${
      vaccineData["Female(IndividualsVaccinated)"] || 0
    } [${getPercent(
      vaccineData["Female(IndividualsVaccinated)"] || 0,
      vaccineData["TotalIndividualsVaccinated"] || 0
    )}%].\n`;
    dataHtml += `<strong>Transgenders Vaccinated</strong>: ${
      vaccineData["Transgender(IndividualsVaccinated)"] || 0
    } [${getPercent(
      vaccineData["Transgender(IndividualsVaccinated)"] || 0,
      vaccineData["TotalIndividualsVaccinated"] || 0
    )}%].\n`;
    dataHtml += `<strong>Total</strong>: ${
      vaccineData["TotalIndividualsVaccinated"] || 0
    }\n\n`;

    dataHtml += `<strong>18+ Vaccinated</strong>: ${
      vaccineData["18-45years(Age)"] || 0
    } [${getPercent(
      vaccineData["18-45years(Age)"] || 0,
      vaccineData["TotalIndividualsVaccinated"] || 0
    )}%].\n`;
    dataHtml += `<strong>45+ Vaccinated</strong>: ${
      vaccineData["45-60years(Age)"] || 0
    } [${getPercent(
      vaccineData["45-60years(Age)"] || 0,
      vaccineData["TotalIndividualsVaccinated"] || 0
    )}%].\n`;
    dataHtml += `<strong>60+ Vaccinated</strong>: ${
      vaccineData["60+years(Age)"] || 0
    } [${getPercent(
      vaccineData["60+years(Age)"] || 0,
      vaccineData["TotalIndividualsVaccinated"] || 0
    )}%].\n`;
    dataHtml += `<strong>Total</strong>: ${
      vaccineData["TotalIndividualsVaccinated"] || 0
    }\n\n`;

    await ctx.replyWithHTML(dataHtml);
  }
});

module.exports = { covBot };
