// ------------------------------- Card Pool ---------------------------------//
var cardDeck = [

    { name: "1.png", image: "img/cards/1.png" }, // new add 
    { name: "2.png", image: "img/cards/2.png" }, // new add 
    { name: "3.png", image: "img/cards/3.png" }, // new add 
    { name: "4.png", image: "img/cards/4.png" }, // new add 
    { name: "5.png", image: "img/cards/5.png" }, // new add 
    { name: "6.png", image: "img/cards/6.png" }, // new add 
    { name: "7.png", image: "img/cards/7.png" }, // new add 
    { name: "8.png", image: "img/cards/8.png" }, // new add 
    { name: "9.png", image: "img/cards/9.png" }, // new add 
    { name: "10.png", image: "img/cards/10.png" }, // new add 
    { name: "11.png", image: "img/cards/11.png" }, // new add 
    { name: "12.png", image: "img/cards/12.png" }, // new add 
    { name: "13.png", image: "img/cards/13.png" }, // new add 
    { name: "14.png", image: "img/cards/14.png" }, // new add 
    { name: "15.png", image: "img/cards/15.png" }, // new add 
    { name: "16.png", image: "img/cards/16.png" }, // new add 
    { name: "17.png", image: "img/cards/17.png" }, // new add 
    { name: "18.png", image: "img/cards/18.png" }, // new add 
    { name: "19.png", image: "img/cards/19.png" }, // new add 
    { name: "20.png", image: "img/cards/20.png" }, // new add 
    { name: "21.png", image: "img/cards/21.png" }, // new add 
    { name: "22.png", image: "img/cards/22.png" }, // new add 
    { name: "23.png", image: "img/cards/23.png" }, // new add 
    { name: "24.png", image: "img/cards/24.png" }, // new add 
    { name: "25.png", image: "img/cards/25.png" }, // new add 
    { name: "26.png", image: "img/cards/26.png" }, // new add 
    { name: "27.png", image: "img/cards/27.png" }, // new add 
    { name: "28.png", image: "img/cards/28.png" }
]

// Declare cardSet for all cards
var cardcard = document.querySelectorAll('.card')
var board = document.getElementById('board')
var dashboard = document.getElementById('dashboard')
var colorPicker = document.getElementById('colorPicker')
var data = document.getElementById('data')

const memoryGame = document.getElementById("memory-game")
var dial = document.getElementById('dial')
var restartButton = document.getElementById("restartButton");

// ----------------- Sound -----------------
const flipSound = document.getElementById('flipSound')
var cardGet = document.getElementById('cardGet')
const match = document.getElementById('match')
const startButton = document.getElementById('startSound')
const shutSound = document.getElementById('shutSound')
const tapSound = document.getElementById('tap')

function switchSound() {
    tapSound.play()
}


var winCount = 0;

let cardValues = [];

const generateRandom = (size = 9) => {
    //temporary array
    let tempArray = [...cardDeck];
    //initializes cardValues array
    cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist

    //Random object selection
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        //once selected remove the object from temp array
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

generateRandom(9);

const matrixGenerator = (cardValues, size = 18) => {
    memoryGame.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    // //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 18; i++) {
        memoryGame.innerHTML += `
             <div class="card" data-framework="${cardValues[i].name}">
                 <img class="front-face" src="${cardValues[i].image}" alt="front" />
                 <img class="back-face" src="img/bg/9.png" alt="JS Badge" />
            </div>
             `;
    }
    //Grid
    memoryGame.style.gridTemplateColumns = `repeat(${size},auto)`;
}

matrixGenerator(cardValues, 18);


/*--------------- Generate Board ------------------*/
function generateBoard() {
    generateRandom(9);
    matrixGenerator(cardValues, 18);
    shuffle();
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };

        this.interval = null;
        this.remainingSeconds = 0;

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                // this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            const inputMinutes = 0.5; // Set the time
            shutSound.play()
            dashboard.classList.remove('dashbg')
            dashboard.style.color = "black";

            generateBoard()
            cardcard.forEach(card => card.removeEventListener('click', flipCard))


            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">start</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">Pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start() {
        startButton.play()
        const inputMinutes = 0.5; // Set the time

        dashboard.classList.remove('dashbg') // Remove dashboard background color
        dashboard.style.color = "black";

        if (inputMinutes < 60) {
            //this.stop();
            this.remainingSeconds = inputMinutes * 60;
            this.updateInterfaceTime();
        }

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                toggleModal();
                clearInterval(this.interval);

                this.interval = null;
                cardcard.forEach(card => card.removeEventListener('click', flipCard))
            }
        }, 1000);

        // this.updateInterfaceControls();

        dashboard.classList.add('dashbg');
        dashboard.style.color = "white";

        winCount = 0;

        generateBoard();
        var cardcard = document.querySelectorAll('.card')
        cardcard.forEach(card => card.addEventListener('click', flipCard))

    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `       
			<button type="button" class="timer__btn timer__btn--control timer__btn--start">
				<span class="material-icons">Start</span>
			</button>
                        <span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>

			<button type="button" class="timer__btn timer__btn--reset">
				<span class="material-icons">Reset</span>
			</button>
		`;
    }
}

var timer = new Timer(
    document.querySelector(".timer")
);



var title = document.querySelector('.title')


var titleArray = [
    'white.jpg',
    'pinkstar.jpg',
    'purplestar.jpg',
    'bluehr.jpg',
    'gplay.png',
    'gify1.png',
    '11.jpg',
    '61483.jpg',
    '5231801.jpg',
    'rainbow.jpg',
    'rainbow1.png',
    'cloud1.jpg',
    'iceblue.jpg',
    'blue2.jpg',
    'brgr.jpg'
]
var aRamdomNum = Math.floor(Math.random() * titleArray.length);
title.style.backgroundImage = "url(img/bg/" + titleArray[aRamdomNum] + ")";


// ======================= Modal ===========================
var modalText = document.getElementById('modalText')
var modalImg = document.getElementById('modalImg')
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
    if (winCount === 9) {
        modalImg.classList.remove('hide')
        modalText.innerHTML = `You win！<br>`;
    } else {
        modalImg.classList.add('hide')
        shutSound.play()
        modalText.innerHTML = `You lose……<br>`;
    }
}


closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);


/*--------------------------- Background Colors -----------------------------------*/
var colorArray = [
    'rgba(57, 100, 136, 0.877)', // navy
    'rgba(255, 227, 133, 0.329)', // yellow
    'rgba(6, 145, 133, 0.329)', //green candy
    'rgba(29, 30, 70, 0.363)', //gray
    'rgba(214, 112, 112, 0.329)', //pink
    'rgba(177, 111, 13, 0.329)', //vintage yellow
    'rgba(131, 4, 4, 0.527)', // red
    'rgba(13, 76, 95, 0.733)', // solid
    'rgba(4, 131, 21, 0.363)', //green
    'rgba(117, 51, 141, 0.541)', //purple
    '#408a8d', // green
    '#30404d', // cyberpunk
    '#422249' // dark purple
]

var j = 0
colorPicker.addEventListener('click', function color() {
    board.style.backgroundColor = colorArray[j];
    j++;
    if (j === colorArray.length) {
        j = 0;
    }
})


let hasFlippedCard = false;
let lockBoard = false;

let firstCard, secondCard;



function flipCard() {
    flipSound.play()
    if (lockBoard) {
        return;
    }
    // this : card
    if (this === firstCard) {
        return;
    }

    // Add flip class to the card
    this.classList.add('flip');

    if (!hasFlippedCard) { // If hasFlippedCard is false
        // first click
        hasFlippedCard = true; // Set hasFlippedCard to true
        firstCard = this; // Set firstCard to this object
        return;
    } else {
        // second click

        secondCard = this;
    }
    checkForMatch();
}


/*----------------------- Check if Match -----------------------*/
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        match.play()
        disableCards();
        winCount += 1;

    } else {
        unflipCards();
    }

    if (winCount === 9) {
        cardGet.play();
        toggleModal(); // Modal pops up
        clearInterval(timer.interval)
    }
}



function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 280);
}


/*----------------- Shuffle ------------------*/

function shuffle() {
    cardcard.forEach(card => {
        let randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
    });
}
shuffle();