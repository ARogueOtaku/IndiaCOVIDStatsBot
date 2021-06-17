function getPercent(val, tot) {
  let percent = 0;
  if (tot !== 0) percent = (val / tot) * 100;
  return percent.toFixed(2);
}

function getFormattedVaccineData(vaccineData) {
  let MaleCount = parseInt(vaccineData["Male(IndividualsVaccinated)"]) || 0;
  let FemaleCount = parseInt(vaccineData["Female(IndividualsVaccinated)"]) || 0;
  let TransgenderCount = parseInt(vaccineData["Transgender(IndividualsVaccinated)"]) || 0;
  let totalGenderCount = MaleCount + FemaleCount + TransgenderCount;
  let eighteenPlusCount = parseInt(vaccineData["18-45years(Age)"]) || 0;
  let fortyfivePlusCount = parseInt(vaccineData["45-60years(Age)"]) || 0;
  let sixtyPlusCount = parseInt(vaccineData["60+years(Age)"]) || 0;
  let totalAgeCount = eighteenPlusCount + fortyfivePlusCount + sixtyPlusCount;
  let covaxinCount = parseInt(vaccineData["TotalCovaxinAdministered"]) || 0;
  let covishieldCount = parseInt(vaccineData["TotalCoviShieldAdministered"]) || 0;
  let sputnikCount = parseInt(vaccineData["TotalSputnikVAdministered"]) || 0;
  let totalTypeCount = covaxinCount + covishieldCount + sputnikCount;
  let firstDoseCount = parseInt(vaccineData["FirstDoseAdministered"]) || 0;
  let secondDoseCount = parseInt(vaccineData["SecondDoseAdministered"]) || 0;
  let totalDoseCount = firstDoseCount + secondDoseCount;

  const vaccineDataHtml = `<pre><strong>${vaccineData["State"]} data as Updated on: </strong>${vaccineData["UpdatedOn"]}


<strong>♂️ Males Vaccinated: </strong>${MaleCount} [${getPercent(MaleCount, totalGenderCount)}%]
<strong>♀️ Females Vaccinated: </strong>${FemaleCount} [${getPercent(FemaleCount, totalGenderCount)}%]
<strong>⚧️ Transgenders Vaccinated: </strong>${TransgenderCount} [${getPercent(TransgenderCount, totalGenderCount)}%]
<strong>Total: </strong>${totalGenderCount}
  
<strong>👦 18+ Vaccinated: </strong>${eighteenPlusCount} [${getPercent(eighteenPlusCount, totalAgeCount)}%]
<strong>👨 45+ Vaccinated: </strong>${fortyfivePlusCount} [${getPercent(fortyfivePlusCount, totalAgeCount)}%]
<strong>👴 60+ Vaccinated: </strong>${sixtyPlusCount} [${getPercent(sixtyPlusCount, totalAgeCount)}%]
<strong>Total: </strong>${totalAgeCount}
  
<strong>🇮🇳 Covaxin Administered: </strong>${covaxinCount} [${getPercent(covaxinCount, totalTypeCount)}%]
<strong>🇬🇧 Covishield Administered: </strong>${covishieldCount} [${getPercent(covishieldCount, totalTypeCount)}%]
<strong>🇷🇺 SputnikV Administered: </strong>${sputnikCount} [${getPercent(sputnikCount, totalTypeCount)}%]
<strong>Total: </strong>${totalTypeCount}

<strong>1️ First Dose Administered: </strong>${firstDoseCount} [${getPercent(firstDoseCount, totalDoseCount)}%]
<strong>2️ Second Dose Administered: </strong>${secondDoseCount} [${getPercent(secondDoseCount, totalDoseCount)}%]
<strong>Total: </strong>${totalDoseCount}</pre>`;

  return vaccineDataHtml;
}

module.exports = { getFormattedVaccineData };
