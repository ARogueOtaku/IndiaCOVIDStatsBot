const fetch = require("node-fetch");
const csvToJson = require("convert-csv-to-json");

const states = [
  "India",
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function areSameStates(state1, state2) {
  state1 = state1.toLowerCase().replace(/\s/g, "");
  state2 = state2.toLowerCase().replace(/\s/g, "");
  return state1 == state2;
}

async function getLatestVaccineData(state) {
  const vaccineDataResponse = await fetch("http://api.covid19india.org/csv/latest/cowin_vaccine_data_statewise.csv");
  const vaccineDataText = await vaccineDataResponse.text();
  const allVaccineData = csvToJson.fieldDelimiter(",").csvStringToJson(vaccineDataText);
  const stateVaccineData = allVaccineData.filter((vaccineData) => areSameStates(vaccineData["State"], state));
  if (!stateVaccineData.length) throw new Error("No Data for State: " + state);
  stateVaccineData.sort((state1, state2) => {
    const date1 = state1["UpdatedOn"].split("/").reverse().join("");
    const date2 = state2["UpdatedOn"].split("/").reverse().join("");
    return date2.localeCompare(date1);
  });
  for (let vaccineData of stateVaccineData) {
    if (vaccineData["TotalIndividualsVaccinated"]) return vaccineData;
  }
  return stateVaccineData[1];
}

async function getAffectedData(state) {
  const affectedDataResponse = await fetch("https://api.covid19india.org/data.json");
  const affectedDataJson = await affectedDataResponse.json();
  const allAffectedData = affectedDataJson["statewise"];
  if (!allAffectedData) throw new Error("No Data for State: " + state);
  const stateAffectedData = allAffectedData.filter(
    (affectedData) =>
      (state === "India" && affectedData["state"] === "Total") || areSameStates(state, affectedData["state"])
  );
  return stateAffectedData;
}

(async function () {
  console.log(await getAffectedData("India"));
})();

module.exports = { getLatestVaccineData, getAffectedData, states };
