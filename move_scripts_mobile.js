var title = document.querySelector('.title')


var titleBgArray = [
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
var aRamdomNum = Math.floor(Math.random() * titleBgArray.length);
title.style.backgroundImage = "url(img/bg/" + titleBgArray[aRamdomNum] + ")";

var board = document.getElementById('board')
var dashboard = document.getElementById('dashboard')
var colorPicker = document.getElementById('colorPicker')
var data = document.getElementById('data')

var counterTimer = document.getElementById('counterTimer')
var counter = document.getElementById("counter")


var memoryGame = document.getElementById("memory-game")
var frame = document.getElementById("frame");


var dial = document.getElementById('dial')
var bar = document.getElementById('bar')
var barOuter = document.querySelector('.barOuter')
var restartButton = document.getElementById("restartButton");


// ----------------- Sound -----------------
const flipSound = document.getElementById('flipSound')

const match = document.getElementById('match')
const startButton = document.getElementById('startSound')
var cardGet = document.getElementById('cardGet')
const tapSound = document.getElementById('tap')

const jingsu = document.getElementById('jingsu')
const jibu = document.getElementById('jibu')

function switchSound() {
    tapSound.play()
}


// ======================= Modal ===========================
const modal = document.querySelector(".modal");
var modalText = document.getElementById('modalText')
var modalImg = document.getElementById('modalImg')
const closeButton = document.querySelector(".close-button");


function toggleModal() {
    modal.classList.toggle("show-modal");
    imgSrc = 'img/head/pathhead3.png'
    modalText.innerHTML = `${yourTitle()}`;
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal); // Close the modal
window.addEventListener("click", windowOnClick);

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
    { name: "24.png", image: "img/cards/24.png" } // new add 
]

let cardValues = [];
//Pick random objects from the items array
const generateRandom = (size = 9) => {
    //temporary array
    let tempArray = [...cardDeck];
    //initializes cardValues array
    cardValues = [];

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




// Declare cardSet for all cards
var cardcard = document.querySelectorAll(".card");
barOuter.classList.add('hide');


var dialInterval;
var winCount = 0;
let movesCount = 0;
var resetCounter = 0;

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
    '#422249', // dark purple
    '#f4dac1' // soo

]

var j = 0
colorPicker.addEventListener('click', function color() {
    board.style.backgroundColor = colorArray[j];
    j++;
    if (j == colorArray.length) {
        j = 0;
    }
})

/* ------------------------- （ end of random battle ) ----------------------------*/


/* ---------- Interval ------------ */

let interval; // Store the setInterval(timeGenerator, 1000)

let hasFlippedCard = false;
let lockBoard = false;

let firstCard, secondCard;



/*---------------------- Timer -----------------------*/
//Initial Time
let seconds = 0,
    minutes = 0;


function yourTitle() {
    if (movesCount <= 17) {
        modalImg.classList.remove('hide')
        return `<p>Level<br>
                <span class="animate-charcter">War God!</span></p>
            `;
    }
    if (movesCount > 17 && movesCount <= 24) {
        let gap = movesCount - 17;
        modalImg.classList.add('hide')
        return `<p>Level: <span style="color: #860029;font-weight: 600;font-family: Verdana, Geneva, Tahoma, sans-serif;">Cavalry</span><br>
        [You are <span style="color: #860029; font-weight: 600; font-family: Verdana, Geneva, Tahoma, sans-serif;">${gap}</span> moves more than War God!]</p>`;
    }
    if (movesCount > 24 && movesCount <= 40) {
        modalImg.classList.add('hide')
        let gap1 = movesCount - 24;
        let gap2 = movesCount - 17;
        return `<p>Level: <span style="color: #860029;font-weight: 600;font-family: Verdana, Geneva, Tahoma, sans-serif;">Infantry</span><br>
                [You are <span style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: #860029;font-weight: 600;">${gap1}</span> moves more than Cavalry!]<br>
                [You are <span style="color: #860029; font-weight: 600; font-family: Verdana, Geneva, Tahoma, sans-serif;">${gap2}</span> moves more than War God!]</p>`;
    } else {
        modalImg.classList.add('hide')
        let gap1 = movesCount - 40;
        let gap2 = movesCount - 17;

        return `<p>Level: Militia<br>
        [You are <span style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: #860029;font-weight: 600;">${gap1}</span> moves more than Infantry!]<br>
        [You are <span style="font-family: Verdana, Geneva, Tahoma, sans-serif;color: #860029;font-weight: 600;">${gap2}</span> moves more than War God!]</p>`
    }
}

const movesCounter = () => {
    movesCount += 1;
    counterTimer.innerHTML = `<span> Moves: ${movesCount}</span>`;
};


// -----------------------------------------------------------------------

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
        movesCounter();
    }
    checkForMatch();
}


function fillBar1() { bar.classList.add('w1') }

function fillBar2() { bar.classList.add('w2') }

function fillBar3() { bar.classList.add('w3') }

function fillBar4() { bar.classList.add('w4') }

function fillBar5() { bar.classList.add('w5') }

function fillBar6() { bar.classList.add('w6') }

function fillBar7() { bar.classList.add('w7') }

function fillBar8() { bar.classList.add('w8') }

function fillBar9() { bar.classList.add('w9') }


/*----------------------- Check if match -----------------------*/
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        match.play();
        disableCards();
        // matchDialogueGenerator()
        winCount += 1;


        if (winCount == 1) {
            fillBar1();
        }
        if (winCount == 2) {
            fillBar2();
        }
        if (winCount == 3) {
            fillBar3();
        }
        if (winCount == 4) {
            fillBar4();
        }
        if (winCount == 5) {
            fillBar5();
        }
        if (winCount == 6) {
            fillBar6();
        }
        if (winCount == 7) {
            fillBar7();
        }
        if (winCount == 8) {
            fillBar8();
        }
        if (winCount == 9) {
            fillBar9();
        }
    } else {
        unflipCards();
    }
    if (winCount == 9) {
        cardGet.play(); // Play
        toggleModal(); // Pop


        clearInterval(interval);

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
    }, 400);
}



function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*----------------- shuffle Cards ------------------*/

function shuffle() {
    cardcard.forEach(card => {
        let randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
    });
}

shuffle();


function addRocket() {
    document.getElementById('rocket').classList.add('flier')
    document.getElementById('rocket').classList.remove('hide')

}



/*--------------- Generate Board ------------------*/
function generateBoard() {
    generateRandom(9);

    matrixGenerator(cardValues, 18);
    shuffle();
}

/*--------------- addEventListener for card flip ------------------*/
function listenFlip() {
    var cardcard = document.querySelectorAll('.card')
    for (let i = 0; i < cardcard.length; i++) {
        cardcard[i].addEventListener('click', flipCard)
    }
    cardcard.forEach(card => card.classList.remove('flip'))
}



/*------------------ Start ---------------------*/
function startGame() {
    startButton.play() // start button sound

    addRocket();
    resetBoard();
    setTimeout(() => {
        document.getElementById('rocket').classList.add('hide')
    }, 1700)
    counterTimer.classList.remove('hide')

    //result.classList.remove('hide')
    barOuter.classList.remove('hide');

    // resetBoard();
    winCount = 0;
    movesCount = 0;
    if (dashboard.classList.contains('dashbg')) {
        dashboard.classList.remove('dashbg');
        setTimeout(() => {
            dashboard.classList.add('dashbg');
        }, 1)
    } else {
        dashboard.classList.add('dashbg');
    }

    counterTimer.innerHTML = `<span>步 数: 0</span>`
    counterTimer.style.color = "white";

    bar.className = 'w0';
    bar.classList.remove('hide');


    // Generate Board
    generateBoard();
    listenFlip();

}


restartButton.addEventListener('click', startGame)