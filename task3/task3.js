// Задание 3. Страна + соседние
// Изучить внимательно варианты запросов к API из первого задания (https://restcountries.com/). Посмотрите, как можно получить информацию об одной стране по названию, по коду.
// Получить информацию об одной стране, имеющей соседей, например Испании. Отрисовать ее карточку.
// Затем, внутри ответа (во втором then) отправить дополнительный запрос за информацией о ее соседних странах (информация о соседях есть в объекте страны), отрисовать их карточки рядом или ниже, сделать их более мелкими по размеру, добавить заголовок «Соседняя страна» (см. ПРИМЕР).
const flagImg = document.querySelectorAll(".card-img-top"),
countryName = document.querySelectorAll(".card-title"),
landName = document.querySelectorAll(".card-text"),
populationName = document.querySelectorAll(".population"),
languageName = document.querySelectorAll(".language"),
currencyName = document.querySelectorAll(".currency"),
card = document.querySelectorAll(".card");

fetch("https://restcountries.com/v3.1/name/Spain?fullText=true")
  .then((response) => response.json())
  .then((data) => getCountryCard(data))
  .catch((error) => console.error(error));

function getCountryCard(data){
    flagImg[0].src = data[0].flags.png;
    countryName[0].innerText = data[0].name.official;
    landName[0].innerText = data[0].region;
    for (const key in data[0].languages) {
      languageName[0].innerText = data[0].languages[key];
    }
    let populationNum = data[0].population / 1000000;
    populationName[0].innerText = populationNum.toFixed(1) + " mln";
    for (const key in data[0].currencies) {
      currencyName[0].innerText = data[0].currencies[key].symbol + " " + data[0].currencies[key].name;
    }
    getEmojiFamily();
    getEmojiLang();
    getEmojiCurrency();

    for (let j = 0; j < data[0].borders.length; j++){
        let i = j + 1;
        fetch(`https://restcountries.com/v3.1/alpha/${data[0].borders[j]}`)
          .then((response) => response.json())
          .then((data) => getBorderCard(data))
          .catch((error) => console.error(error));

        function getBorderCard(data){
          const header = document.createElement("div");
          header.innerText = "Neighboring Country";
          header.className = "header-neighbors";
          card[i].insertBefore(header, flagImg[i]);

          card[i].className = "card-neighbors";
          flagImg[i].src = data[0].flags.png;
          countryName[i].innerText = data[0].name.official;
          landName[i].innerText = data[0].region;
          for (const key in data[0].languages) {
            languageName[i].innerText = data[0].languages[key];
          }
          let populationNum = data[0].population / 1000000;
          populationName[i].innerText = populationNum.toFixed(1) + " mln";
          for (const key in data[0].currencies) {
            currencyName[i].innerText = data[0].currencies[key].symbol + " " + data[0].currencies[key].name;
          }
        } 
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
