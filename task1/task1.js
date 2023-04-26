// Задание 1. Emojihub
// Изучите документацию API эмодзи:
// https://github.com/abourtnik/emojis-world
// В разделе Endpoints найдите, по какому url получить, и изучите ответы:
// случайный эмодзи
// массив всех эмодзи
// эмоджи определенной категории
// 1.1. Добавить в html кнопку «Получить эмодзи дня», под ней пустой див для результата. По нажатию кнопки отправлять запрос за рандомным эмодзи, отобразить его в диве под кнопкой, размером примерно 70px (это можно сделать с помощью CSS-свойства font-size).
const clickBtn = document.getElementById("get-emoji"),
emojiRes = document.querySelector(".res-emoji");

clickBtn.addEventListener("click", ()=>{
    fetch(
        "https://api.emojisworld.fr/v1/random?limit=1",    
    )
        .then((response) => response.json())         
        .then((data) =>  getEmojiImg(data))
        .catch((error) => console.error(error));
})

function getEmojiImg(data){
    console.log(data.results[0].emoji);
    emojiRes.style.fontSize = "70px";
    emojiRes.innerText = data.results[0].emoji;
}
// 1.2. Отправить запрос за всеми эмодзи, разместить их на странице по категориям (см. образец ЗДЕСЬ).
// ВАЖНО! Не нужно делать отдельные запросы для категорий, необходимо взять результат из одного общего запроса. Вам может быть удобно использовать конструкцию Switch-Case, почитайте о ней ЗДЕСЬ.
// let h1 = document.createElement("h1");
// let emojisBlock = document.createElement("div");


fetch("https://api.emojisworld.fr/v1/categories")
  .then((response) => response.json())
  .then((data) => getEmojiCategory(data))
  .catch((error) => console.error(error));

function getEmojiCategory(data) {
  let header1 = document.createElement("h1");
  let emojisBlock1 = document.createElement("div");
  let arrEmoji1 = [];
  document.body.appendChild(header1);
  document.body.appendChild(emojisBlock1);

  let header2 = document.createElement("h1");
  let emojisBlock2 = document.createElement("div");
  let arrEmoji2 = [];
  document.body.appendChild(header2);
  document.body.appendChild(emojisBlock2);

  let header3 = document.createElement("h1");
  let emojisBlock3 = document.createElement("div");
  let arrEmoji3 = [];
  document.body.appendChild(header3);
  document.body.appendChild(emojisBlock3);

  data.results.forEach((emojiCat) => {
    switch (emojiCat.name) {
      case "Smileys & Emotion":
        getEmojis(emojiCat, header1, arrEmoji1, emojisBlock1);
        break;
      case "Food & Drink":
        getEmojis(emojiCat, header2, arrEmoji2, emojisBlock2);
        break;
      case "Travel & Places":
        getEmojis(emojiCat, header3, arrEmoji3, emojisBlock3);
        break;
    }
  });

  function getEmojis(emojiObj, header, arrEmoji, emojisBlock) {
    header.innerText = emojiObj.name;
    header.style.fontSize = "40px";

    emojiObj.sub_categories.forEach(emojiGroup => {
      fetch(`https://api.emojisworld.fr/v1/search?q=${emojiGroup.name}`)
        .then((response) => response.json())
        .then((data) => getEmojiImg(data));
      function getEmojiImg(data){
        data.results.forEach(emojiInfo => {
          arrEmoji.push(emojiInfo.emoji);
          emojisBlock.innerText = arrEmoji.join(" ");
        })
      }
    })
  }
}    







