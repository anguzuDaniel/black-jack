"use strict";

// LOGIN PAGE
const email = document.getElementById("email");
const password = document.getElementById("password");
const LoginBtn = document.getElementById("login-btn");
const loginPage = document.querySelector(".login__container");
const loginErrorMessage = document.getElementById("errorMessage");
const homePage = document.querySelector(".homepage__container");

// HOME PAGE
const dealerBtn = document.querySelector(".homepage__btn--dealer");
const playerBtn = document.querySelector(".homepage__btn--player");
const body = document.querySelector(".container");

////////////////////////////////////////////////////////////////////
// Dealer Operations
const shuffleBtn = document.getElementById("shuffleBtn");
const dealCards = document.getElementById("deal-cards");
const doubleBtn = document.getElementById("shuffleBtn");
const stand = document.getElementById("stand");
const hit = document.getElementById("hit");
const double = document.getElementById("double");

// PLAYER CHOICE CHECKBOX
const dealerRadioBtn = document.getElementById("homepage__dealer--checkbox");
const playerRadioBtn = document.getElementById("homepage__player--checkbox");
const stake = document.getElementById("stake");
const enterBtn = document.getElementById("homepage__player--choice");
const playerCard = document.getElementById("player-card");
const dealerCard = document.getElementById("dealer-card");
const bet = document.getElementById("bet");
let playerTotal = document.getElementById("player-total");
const dealerTotal = document.getElementById("dealer-total");
const messageOutput = document.querySelector(".game__display--output");
const dealBtn = document.getElementById("deal");
const standBtn = document.getElementById("stand");

// ACCOUNT LOGIN DETIALS
const account = {
	email: "account@gmail.com",
	password: 1234,
};

// Objects
let message = "Deal to begin game.";
const player = {
	cards: [],
	sum: 0,
	isAlive: false,
	hasBlackJack: false,
	firstCard: 0,
	secondCard: 0,
};

const dealer = {
	cards: [],
	sum: 0,
	isAlive: false,
	hasBlackJack: false,
	firstCard: 0,
	secondCard: 0,
};

////////////////////////// LOGIN LOGIC /////////////////////////
/**
 * enables a user to login using account details provided in the account object
 * then transfers the user to the home page if password & email input are correct
 * by setting the opacity of the login page to zero,
 * and print an error message if condition is false.
 */
function renderHomePageView() {
	const userLogin = function () {
		if (account.email === email.value && account.password === +password.value) {
			loginPage.style.opacity = 0;
			loginPage.style.display = "none";
		} else {
			loginErrorMessage.innerText =
				"Invalid email/password, Please enter correct information to continue!";
		}
	};

	// listens for click event from the login button
	// then calls the userLogin() function.
	LoginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		userLogin();
	});
}
renderHomePageView();

/////////////////// PLAYER OPERATIONS /////////////////////////////
///////////////////////////////////////////////////////////////////
///////////// Get random card
function getRandomCard() {
	let randomNumber = Math.floor(Math.random() * 13) + 1;
	if (randomNumber > 10) {
		return 10;
	} else if (randomNumber === 1) {
		return 11;
	} else {
		return randomNumber;
	}
}

function startGame() {
	player.isAlive = true;
	player.firstCard = getRandomCard();
	player.secondCard = getRandomCard();
	player.cards.push(player.firstCard);
	player.cards.push(player.secondCard);

	for (let i = 0; i < player.cards.length; i++) {
		player.sum += player.cards[i];
		playerCard.textContent += player.cards[i] + " ";
	}

	dealer.isAlive = true;
	dealer.firstCard = getRandomCard();
	dealer.secondCard = getRandomCard();
	dealer.cards.push(dealer.firstCard);
	dealer.cards.push(dealer.secondCard);

	for (let i = 0; i < dealer.cards.length; i++) {
		dealer.sum += dealer.cards[i];
		dealer.textContent += dealer.cards[i] + " ";
	}

	playerCard.textContent = 0;
	dealerCard.textContent = 0;
	bet.value = stake.value;

	messageOutput.textContent = message;
}
startGame();

function updateCards() {
	playerCard.textContent = " ";
	dealerCard.textContent = " ";

	for (let i = 0; i < player.cards.length; i++) {
		playerCard.textContent += player.cards[i] + " ";
	}

	for (let i = 0; i < dealer.cards.length; i++) {
		dealerCard.textContent += dealer.cards[i] + " ";
	}

	playerTotal.textContent = player.sum;
	dealerTotal.textContent = dealer.sum;

	if (player.sum <= 20 && dealer.sum <= 20) {
		message = "Do you want to draw a new Card?";
		messageOutput.textContent = message;
	} else if (player.sum === 21 || dealer.sum === 21) {
		message = "got BlackJack!!!";

		if (player.sum === 21) {
			messageOutput.textContent = `Congradulation, You've ${message} 🎉`;
			player.hasBlackJack = true;
		}

		if (dealer.sum === 21) {
			messageOutput.textContent = `House has ${message} 🎉`;
			dealer.hasBlackJack = true;
		}
	} else {
		messageOutput.textContent = `😞 you lost...`;
		dealer.hasBlackJack = false;
		dealer.isAlive = false;
		dealer.hasBlackJack = false;
		player.isAlive = false;
	}
}

/////////////////////////// EVENT LISTENERS ////////////////////////////
// PLAYER OPPERATIONS
/**
 * Hit: this is an instruction carried out by the player to the dealer to request an extra card and can be indicated in verbal form or by simply tapping the table.
 *
 * This eventListener listens for a click from the player,
 * If condition is true
 * - Creates a new card.
 * - Adds card to the cards array.
 * - resets text content player card && player blackjack
 *
 * - loops through playercard array
 * - updates card
 * - updates sum
 * - if player.sum greater than 21 isAlive is set to false
 *
 */
hit.addEventListener("click", () => {
	if (player.isAlive === true && player.hasBlackJack === false) {
		let card = getRandomCard();
		player.cards.push(card);
		playerCard.textContent = " ";
		// playerTotal.textContent = " ";

		for (let i = 0; i < player.cards.length; i++) {
			playerCard.textContent += player.cards[i] + " ";
			player.sum += player.cards[i];
			playerTotal.textContent = player.sum;
			
			if (player.sum < 21) {
				player.isAlive = false;
			}
		}
		updateCards();
	}
});

/**
 * Used by the dealer to carry out deals
 *
 */

dealBtn.addEventListener("click", () => {
	if (dealer.sum <= 21 || player.sum <= 21) {
		updateCards();
	}
});

standBtn.addEventListener("click", () => {
	if (dealer.isAlive === true && dealer.hasBlackJack === false) {
		dealerCard.textContent = "";

		for (let i = 0; i < dealer.cards.length; i++) {
			dealerCard.textContent += dealer.cards[i] + " ";
			dealer.sum += dealer.cards[i];

			if (dealer.sum >= 21) {
				dealer.isAlive = false;
				player.isAlive = false;
			}
		}
		dealerTotal.textContent = dealer.sum;
		updateCards();
	}
});

// for (let i = 0; i < player.cards.length; i++) {
// 	player.sum += player.cards[i];
// }
//  HOME PAGE
// TODO add dealer page logic

/**
 * Renders  html markup based on parameter passed
 * @param {*} T takes either "player" || "dealer"
 * @returns
 * returns player markup if "player" is passed as parameter,
 * returns dealer markup if "dealer" is passed as parameter
 */
function renderMarkup(T) {
	if (T === "player") {
		return `
			<section class="game__conatiner">
			<h1 class="game__heading | heading--large | heading">Player</h1>
			<div class="game__btn--wapper">
				<button class="game__btn | btn | game__btn--bet" id="shuffleBtn">
					Shuffle
				</button>

				<button class="game__btn | btn | game__btn--double" id="doubleBtn">Double</button>
				<button class="game__btn | btn | game__btn--double" id="showCards">Show</button>
			</div>
			</section>
		`;
	} else if (T === "dealer") {
		return `
			<section class="game__conatiner">
			<h1 class="game__heading | heading--large | heading">Dealer</h1>
			<input type="text" name="card" id="card" class="game__card-choice" />
			<div class="game__btn--wapper">
				<button class="game__btn | btn | game__btn--bet" id="shuffleBtn">
					Shuffle
				</button>
				<button class="game__btn | btn | game__btn--stand" id="deal-cards">
					Deal Cards
				</button>
				<button class="game__btn | btn | game__btn--raise" id="handle-bet">
					Handle Bet
				</button>
				<button class="game__btn | btn | game__btn--double" id="double">Double</button>
			</div>
		</section>
	`;
	} else {
		renderError("Inavlid parameter!!, Choose either player or dealer.");
	}
}

// Hnadler event listener
// function checkboxListner() {
// }

// const playstake = stake.value;
// dealerRadioBtn.addEventListener("change", (e) => {
// 	if (e.target.checked && playstake !== "") {
// 		renderMarkup();
// 		body.innerHTML = renderMarkup("dealer");
// 		console.log("something went wrong!!");
// 	}
// 	return;
// });

// playerRadioBtn.addEventListener("change", (e) => {
// 	if (e.target.checked && playstake !== "") {
// 		renderMarkup();
// 		body.innerHTML = renderMarkup("player");
// 		console.log("something went wrong!!");
// 	}
// 	return;
// });

enterBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (stake.value === "") {
	}
	homePage.style.display = "none";
	bet.textContent = stake.value;
	console.log("opened");
});

// Error message
// Renders an error message based on the message passed as a parameter
function renderError(message) {
	return `
        	<div class="error">
			<div>
				<p class="paragraph | errorMessage__paragraph | paragraph--red">
					Something went wrong 😞. Please try again...
				</p>
                <p class="paragraph | errorMessage__paragraph | paragraph--red">${message}</p>
			</div>
		    </div>
        `;
}

console.log(dealer.cards);
console.log(player.cards);
