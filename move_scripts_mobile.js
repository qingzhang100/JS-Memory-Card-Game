// This file uses JQuery

// ============= The top menu background image pool random generator ===============
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
$(".title").css("background-image", "url(img/bg/" + titleBgArray[aRamdomNum] + ")");
// ===================================================================================

var memoryGame = document.getElementById("memory-game")
var bar = document.getElementById('bar')

// ----------------- Sound -----------------
const flipSound = document.getElementById('flipSound') // .play() can only be used on DOM
const match = document.getElementById('match')
const startButton = document.getElementById('startSound')
var cardGet = document.getElementById('cardGet')
const tapSound = document.getElementById('tap')

const jingsu = document.getElementById('jingsu')
const jibu = document.getElementById('jibu')

function switchSound() {
    tapSound.play()
}


// ------------------- Modal ------------------------

function toggleModal() {
    $(".modal").toggleClass("show-modal");
    imgSrc = 'img/head/pathhead3.png'
    $("#modalText").html(`${yourTitle()}`);
}

function windowOnClick(event) {
    if (event.target === $(".modal")) {
        toggleModal();
    }
}

$(".close-button").click(toggleModal); // Close the modal
window.addEventListener("click", windowOnClick);

// ------------------------------- Card Pool ---------------------------------//
var cardDeck = [
    { name: "1.jpg", image: "img/cards/1.jpg" }, { name: "2.jpg", image: "img/cards/2.jpg" }, { name: "3.jpg", image: "img/cards/3.jpg" },
    { name: "4.jpg", image: "img/cards/4.jpg" }, { name: "5.jpg", image: "img/cards/5.jpg" }, { name: "6.jpg", image: "img/cards/6.jpg" },
    { name: "7.jpg", image: "img/cards/7.jpg" }, { name: "8.jpg", image: "img/cards/8.jpg" }, { name: "9.jpg", image: "img/cards/9.jpg" },
    { name: "10.jpg", image: "img/cards/10.jpg" },
    { name: "11.jpg", image: "img/cards/11.jpg" }, // new add 
    { name: "12.jpg", image: "img/cards/12.jpg" }, // new add 
    { name: "13.jpg", image: "img/cards/13.jpg" }, // new add 
    { name: "14.jpg", image: "img/cards/14.jpg" }, // new add 
    { name: "15.jpg", image: "img/cards/15.jpg" }, // new add 
    { name: "16.jpg", image: "img/cards/16.jpg" }, // new add 
    { name: "17.jpg", image: "img/cards/17.jpg" }, // new add 
    { name: "18.jpg", image: "img/cards/18.jpg" }, // new add 
    { name: "19.jpg", image: "img/cards/19.jpg" }, // new add 
    { name: "20.jpg", image: "img/cards/20.jpg" }, // new add 
    { name: "21.jpg", image: "img/cards/21.jpg" }, // new add 
    { name: "22.jpg", image: "img/cards/22.jpg" }, // new add 
    { name: "23.jpg", image: "img/cards/23.jpg" }
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
    $("#memory-game").html("");
    // memoryGame.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5); // simple shuffle
    for (let i = 0; i < 18; i++) {
        memoryGame.innerHTML += `
                             <div class="card" data-framework="${cardValues[i].name}">
                                 <img class="front-face" src="${cardValues[i].image}" alt="front" />
                                 <img class="back-face" src="img/bg/9.png" alt="JS Badge" />
                    </div>
             `;
    }

    // $("#memory-game").html(`
    //                          <div class="card" data-framework="${cardValues[i].name}">
    //                              <img class="front-face" src="${cardValues[i].image}" alt="front" />
    //                              <img class="back-face" src="img/bg/9.png" alt="JS Badge" />
    //                 </div>
    //          `);

    //Grid
    memoryGame.style.gridTemplateColumns = `repeat(${size},auto)`;
}

matrixGenerator(cardValues, 18);



$(".barOuter").addClass("hide");

var dialInterval;
var winCount = 0;
let movesCount = 0;
var resetCounter = 0;


// ---------------------------------------------------------
//    Color Switch Button to change the background color
// ---------------------------------------------------------

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

var j = 0;
$("#colorPicker").click(function color() {
    $("#board").css("background-color", colorArray[j]);
    j++;
    if (j == colorArray.length) {
        j = 0;
    }
})

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
        $("#modalImg").removeClass("hide")
        return `<p>Level<br>
                <span class="animate-charcter">War God!</span></p>
            `;
    }
    if (movesCount > 17 && movesCount <= 24) {
        let gap = movesCount - 17;
        $("#modalImg").addClass("hide")
        return `<p>Level: <span style="color: #860029;font-weight: 600;font-family: Verdana, Geneva, Tahoma, sans-serif;">Cavalry</span><br>
        [You are <span style="color: #860029; font-weight: 600; font-family: Verdana, Geneva, Tahoma, sans-serif;">${gap}</span> moves more than War God!]</p>`;
    }
    if (movesCount > 24 && movesCount <= 40) {
        $("#modalImg").addClass("hide")
        let gap1 = movesCount - 24;
        let gap2 = movesCount - 17;
        return `<p>Level: <span style="color: #860029;font-weight: 600;font-family: Verdana, Geneva, Tahoma, sans-serif;">Infantry</span><br>
                [You are <span style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: #860029;font-weight: 600;">${gap1}</span> moves more than Cavalry!]<br>
                [You are <span style="color: #860029; font-weight: 600; font-family: Verdana, Geneva, Tahoma, sans-serif;">${gap2}</span> moves more than War God!]</p>`;
    } else {
        $("#modalImg").addClass("hide")
        let gap1 = movesCount - 40;
        let gap2 = movesCount - 17;

        return `<p>Level: Militia<br>
        [You are <span style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: #860029;font-weight: 600;">${gap1}</span> moves more than Infantry!]<br>
        [You are <span style="font-family: Verdana, Geneva, Tahoma, sans-serif;color: #860029;font-weight: 600;">${gap2}</span> moves more than War God!]</p>`
    }
}

const movesCounter = () => {
    movesCount += 1;
    $("#counterTimer").html(`<span> Moves: ${movesCount}</span>`);
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


function fillBar1() { $("#bar").addClass('w1') }

function fillBar2() { $("#bar").addClass('w2') }

function fillBar3() { $("#bar").addClass('w3') }

function fillBar4() { $("#bar").addClass('w4') }

function fillBar5() { $("#bar").addClass('w5') }

function fillBar6() { $("#bar").addClass('w6') }

function fillBar7() { $("#bar").addClass('w7') }

function fillBar8() { $("#bar").addClass('w8') }

function fillBar9() { $("#bar").addClass('w9') }


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
// Declare cardSet for all cards
var cardcard = document.querySelectorAll(".card");

function shuffle() {
    cardcard.forEach(card => {
        let randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
    });

    // --------- Error -------------
    // $(".card").each(function(card) {
    //     let randomPos = Math.floor(Math.random() * 18);
    //     card.style.order = randomPos;
    // })
}

shuffle();

function addRocket() {
    $("#rocket").addClass("flier")
    $("#rocket").removeClass("hide")
}

/*--------------- Generate Board ------------------*/
function generateBoard() {
    generateRandom(9);
    matrixGenerator(cardValues, 18);
    shuffle();
}

/*--------------- addEventListener for card flip ------------------*/
function listenFlip() {

    for (let i = 0; i < $(".card").length; i++) {
        $(".card")[i].addEventListener('click', flipCard)
    }
    $(".card").forEach(card => card.classList.remove('flip'))
}



/*------------------ Start ---------------------*/
function startGame() {
    startButton.play() // start button sound

    addRocket();
    resetBoard();
    setTimeout(() => {
        $("#rocket").addClass("hide")
    }, 1700)
    $("#counterTimer").removeClass('hide')

    $("barOuter").removeClass("hide");

    // resetBoard();
    winCount = 0;
    movesCount = 0;

    // If the dashboard has no background color, add background color. Otherwise remove background color then re-add it.
    if ($("#dashboard").hasClass("dashbg")) {
        $("#dashboard").removeClass("dashbg");
        setTimeout(() => {
            $("#dashboard").addClass("dashbg");
        }, 1)
    } else {
        $("#dashboard").addClass("dashbg");
    }

    $("#counterTimer").html(`<span>Moves: 0</span>`)

    $("#counterTimer").css("color", "white")

    bar.className = 'w0';

    $("#bar").removeClass("hide");

    // Generate Board
    generateBoard();
    listenFlip();

}


$("#restartButton").click(startGame)