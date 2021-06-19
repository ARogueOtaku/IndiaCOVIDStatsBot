# 🇮🇳 COVID Stats Bot

The **🇮🇳 COVID Stats Bot** is a Telegram Bot Designed to inform Users about Corona Virus related Statistics.

## Commands

| CMD        | DESCRIPTION                                                      | USAGE     |
| ---------- | ---------------------------------------------------------------- | --------- | ----------------- |
| _/vaccine_ | Get Latest Vaccine Data for an Indian State.                     | `/vaccine | /vaccine <state>` |
| _/stats_   | Get Latest Active/Recovered and other Stats for an Indian State. | `/stats   | /stats <state>`   |
| _/help_    | Show Help Menu                                                   | `/help`   |

## States

The `/vaccine` and `/stats` command both accept a `<state>` value as an argument to the command.
Below you can find a List of all Available `<state>` values.

- **_India_**
  - _Andaman and Nicobar Islands_
  - _Andhra Pradesh_
  - _Arunachal Pradesh_
  - _Assam_
  - _Bihar_
  - _Chandigarh_
  - _Chhattisgarh_
  - _Dadra and Nagar Haveli and Daman and Diu_
  - _Delhi_
  - _Goa_
  - _Gujarat_
  - _Haryana_
  - _Himachal Pradesh_
  - _Jammu and Kashmir_
  - _Jharkhand_
  - _Karnataka_
  - _Kerala_
  - _Ladakh_
  - _Lakshadweep_
  - _Madhya Pradesh_
  - _Maharashtra_
  - _Manipur_
  - _Meghalaya_
  - _Mizoram_
  - _Nagaland_
  - _Odisha_
  - _Puducherry_
  - _Punjab_
  - _Rajasthan_
  - _Sikkim_
  - _Tamil Nadu_
  - _Telangana_
  - _Tripura_
  - _Uttar Pradesh_
  - _Uttarakhand_
  - _West Bengal_

## FAQ

- **Where do I get this Bot?**
  - Open this [Link](https://t.me/cov19VaccineNumbersBot) with Telegram _App_ and start a Conversation with `/start`. You can also _Search_ Telegram by the Username `@cov19VaccineNumbersBot` and _Add_ it to your _Group_.
- **What Tech Stacks are used to create this Bot**?
  - This Bot was created in _Node.js 12_, using _Telegraf_ NPM Library and it is hosted in _Netlify_.
- **Is there a way I can see the Source Code for this Bot?**
  - Absolutely, The Full Source Code for this Bot can found [Here](https://github.com/ARogueOtaku/covBot).
- **Where does this bot get the Data from**?
  - All Data this bot is reporting is provided and fetched from [COVID19-India API](https://api.covid19india.org/).
