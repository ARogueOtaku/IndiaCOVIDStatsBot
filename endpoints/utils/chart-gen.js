const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const fs = require("fs");

const chartCanvas = new ChartJSNodeCanvas({
  width: 1280,
  height: 1024,
  plugins: {
    requireLegacy: ["chartjs-plugin-datalabels"],
  },
  chartCallback: (ChartJS) => {
    ChartJS.plugins.register({
      beforeDraw: (chart, options) => {
        const ctx = chart.ctx;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1280, 1024);
      },
    });
  },
});

function genChart(config) {
  const stream = chartCanvas.renderToStream(config);
  return stream;
}

function genVaccineChartConfig(vaccineData) {
  const config = {
    type: "bar",
    data: {
      labels: [
        "Male",
        "Female",
        "Transgender",
        "",
        "18-45 Years",
        "45-60 Years",
        "60+ Years",
        "",
        "Covaxin",
        "Covishield",
        "Sputnik V",
      ],
      datasets: [
        {
          backgroundColor: "#0B2027",
          data: [
            vaccineData["Male(IndividualsVaccinated)"] || 0,
            vaccineData["Female(IndividualsVaccinated)"] || 0,
            vaccineData["Transgender(IndividualsVaccinated)"] || 0,
            0,
            vaccineData["18-45years(Age)"] || 0,
            vaccineData["45-60years(Age)"] || 0,
            vaccineData["60+years(Age)"] || 0,
            0,
            vaccineData["TotalCovaxinAdministered"] || 0,
            vaccineData["TotalCoviShieldAdministered"] || 0,
            vaccineData["TotalSputnikVAdministered"] || 0,
          ],
        },
      ],
    },
    options: {
      title: {
        display: true,
        fontColor: "#040D10",
        fontStyle: "bold",
        fontSize: 32,
        text:
          vaccineData["State"] +
          " Vaccination Data as of " +
          vaccineData["UpdatedOn"],
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              fontColor: "#040D10",
              fontSize: 14,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMax: vaccineData["TotalDosesAdministered"] || 0,
              fontColor: "#040D10",
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      plugins: {
        datalabels: {
          align: "top",
          anchor: "end",
          color: "#040D10",
          font: {
            weight: "bold",
            size: 16,
          },
          display: (context) => {
            return (context.dataIndex + 1) % 4 !== 0;
          },
        },
      },
    },
  };
  return config;
}

module.exports = { genChart, genVaccineChartConfig };
