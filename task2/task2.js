// Задание 2. Карточки стран
// Есть API с информацией о 120 странах мира. URL (запросы на FULL NAME):
// https://restcountries.com
// Получить данные с помощью fetch и сформировать разметку карточек стран (например каждую 10-ю из массива) по ОБРАЗЦУ.
// ВАЖНО: Для разметки используйте сетку bootstrap, шаблоны смотрите ЗДЕСЬ.
const flagImg = document.querySelectorAll(".card-img-top"),
countryName = document.querySelectorAll(".card-title"),
landName = document.querySelectorAll(".card-text"),
populationName = document.querySelectorAll(".population"),
languageName = document.querySelectorAll(".language"),
currencyName = document.querySelectorAll(".currency");

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => getCountryCard(data))
  .catch((error) => console.error(error));

function getCountryCard(data){
    getEmojiFamily();
    getEmojiLang();
    getEmojiCurrency();
    let j = 0;
    for (let i = 0; i < countryName.length; i++) {
      flagImg[i].src = data[j].flags.png;
      countryName[i].innerText = data[j].name.official;
      landName[i].innerText = data[j].region;
      for (const key in data[j].languages) {
        languageName[i].innerText = data[j].languages[key];
      }
      let populationNum = data[j].population / 1000000;
      populationName[i].innerText = populationNum.toFixed(1) + " mln";
      for (const key in data[j].currencies) {
        currencyName[i].innerText = data[j].currencies[key].symbol + " " + data[j].currencies[key].name;
      }
      j += 10;
    }
}


function getEmojiLang() {
  fetch("https://api.api-ninjas.com/v1/emoji?name=speaking", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "ZIVeRDdEk9DcKai/VkIOpw==8ULtg1yCaYNFVtQB",
    },
  })
    .then((response) => response.json())
    .then((data) => { 
      for (let i = 0; i < languageName.length; i++){
        const langEmoji = document.createElement("span");
        langEmoji.innerText = data[0].character + " ";
        languageName[i].prepend(langEmoji);
      }
    })
    .catch((error) => console.error(error));
}

function getEmojiFamily() {
  fetch("https://api.api-ninjas.com/v1/emoji?name=family", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "ZIVeRDdEk9DcKai/VkIOpw==8ULtg1yCaYNFVtQB",
    },
  })
    .then((response) => response.json())
    .then((data) => { 
      for (let i = 0; i < populationName.length; i++){
        const familyEmoji = document.createElement("span");
        familyEmoji.innerText = data[0].character + " ";
        populationName[i].prepend(familyEmoji);
      }
    })
    .catch((error) => console.error(error));
}

function getEmojiCurrency() {
  fetch("https://api.api-ninjas.com/v1/emoji?name=money", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "ZIVeRDdEk9DcKai/VkIOpw==8ULtg1yCaYNFVtQB",
    },
  })
    .then((response) => response.json())
    .then((data) => { 
      for (let i = 0; i < currencyName.length; i++){
        const currencyEmoji = document.createElement("span");
        currencyEmoji.innerText = data[1].character + " ";
        currencyName[i].prepend(currencyEmoji);
      }
    })
    .catch((error) => console.error(error));
}


