const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;


const items = [{name: "seth", image: "https://s1.sportstatics.com/relevo/www/multimedia/202306/06/media/cortadas/seth-rollins-RHITO0IojMgNfRL1gEuD1DJ-1200x648@Relevo.jpeg"}, 
{name: "roman", image: "https://www.pwmania.com/wp-content/uploads/2023/07/roman-reigns.jpg"}, 
{name: "punk", image: "https://www.wwe.com/f/styles/og_image/public/all/2023/11/140_SURV_11252023EJ_32143--a3b66a5876106a26f1bd48b2550dd98a.JPG"},
{name: "cody", image: "https://mundolucha.com/wp-content/uploads/2024/01/cronica-cody-rhodes-wwe-royal-rumble-2024-mundolucha-860x484.jpg"},
{name: "gunther", image: "https://www.wwe.com/f/2023/07/20270717_RAW_Gunther--4c8fca7cba6d159fc2c55416d326eb04.jpg"}, 
{name: "bron", image: "https://www.wwe.com/f/styles/og_image/public/all/2023/07/33_NXT_07112023EJ_11704--df243f41ada521be62162d14a3da7ec8.jpg"},
{name: "knight", image: "https://www.usanetwork.com/sites/usablog/files/2023/11/wwe-la-knight2.jpg"}, 
{name: "styles", image: "https://www.wwe.com/f/styles/wwe_large/public/all/2023/09/057_SD_09082023EJ_26439--52f332de41f28a6809d2739a0f7f9b1b.jpg"},
{name: "undertaker", image: "https://www.usanetwork.com/sites/usablog/files/2023/06/wwe-undertaker-dream-match1.jpg"}, 
{name: "rock", image: "https://staticg.sportskeeda.com/editor/2020/03/40983-15854044267094-800.jpg"},
{name: "austin", image: "https://www.wwe.com/f/styles/og_image/public/rd-talent/Bio/Steve_Austin_bio.jpg"},
{name: "cena", image: "https://espanol.wwe.com/f/styles/og_image/public/all/2016/07/John_Cena_bio--b51ea9d0b6f475af953923ac7791391b.jpg"}
];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;


  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
