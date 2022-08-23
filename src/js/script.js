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
const loginMessage = document.querySelector(".homepage__display--output");
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

//////////////////////////////////////////////////////////////////////////
// Resets all the View number and digits
function startGame() {
	player.isAlive = true;
	player.firstCard = getRandomCard();
	player.secondCard = getRandomCard();
	player.cards.push(player.firstCard);
	player.cards.push(player.secondCard);
	playerTotal.textContent = 0;
	playerTotal.textContent = 0;
	playerCard.textContent = 0;

	dealer.isAlive = true;
	dealerCard.textContent = 0;
	dealer.firstCard = getRandomCard();
	dealer.secondCard = getRandomCard();
	dealer.cards.push(dealer.firstCard);
	dealer.cards.push(dealer.secondCard);

	dealer.sum = dealer.firstCard + dealer.secondCard;
	player.sum = player.firstCard + player.secondCard;

	bet.value = stake.value;

	messageOutput.textContent = message;
}
startGame();

////////////////////////////////////////////////////////////////////////////////
// updates cards when called
/**
 * - clears display before looping and updating the display with updated values.
 * 1'st loop updates player information
 * 2'nd loop updates dealer information
 *
 */
function updateCards() {
	playerCard.textContent = " ";
	dealerCard.textContent = " ";

	for (let i = 0; i < player.cards.length; i++) {
		playerCard.textContent += player.cards[i] + " ";
		playerTotal.textContent = player.sum;
	}

	for (let i = 0; i < dealer.cards.length; i++) {
		dealerCard.textContent += dealer.cards[i] + " ";
		dealerTotal.textContent = dealer.sum;
	}

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
		if (player.sum > 21 && dealer.sum < player.sum) {
			messageOutput.textContent = `House wins, you lost the game.`;
			player.isAlive = false;
		}

		if (dealer.sum > 21 && player.sum < dealer.sum) {
			messageOutput.textContent = `You win!!, house lost the game.`;
			dealer.isAlive = false;
		}
	}
}

/////////////////////////// EVENT LISTENERS ////////////////////////////
// PLAYER OPPERATIONS
/**
 * Hit: this is an instruction carried out by the player to the dealer to request an extra card and can be indicated in verbal form or by simply tapping the table.
 *
 * This eventListener listens for a click from the player,
 * - if player.sum greater than 21 isAlive is set to false
 * If condition is true
 * - Creates a new card.
 * - Adds card to the cards array.
 * - resets text content player card && player blackjack
 *
 * - loops through playercard array
 * - updates card
 * - updates sum
 *
 */
hit.addEventListener("click", () => {
	if (player.sum >= 21 || dealer.sum >= 21) {
		player.isAlive = false;
	}

	if (player.isAlive === true && player.hasBlackJack === false) {
		let card = getRandomCard();
		player.cards.push(card);
		playerCard.textContent = " ";
		playerTotal.textContent = " ";
		player.sum += card;
		playerTotal.textContent = player.sum;

		for (let i = 0; i < player.cards.length; i++) {
			playerCard.textContent += player.cards[i] + " ";
		}

		updateCards();
	}
});

/**
 * Used by the dealer to carry out deals
 *
 */

dealBtn.addEventListener("click", () => {
	if (dealer.sum < 21 && player.sum < 21) {
		updateCards();
	}
});

/**
 * Listens for a click from the stand button
 * checks if dealer or player sum >= 21
 * if true sets player.isAlive to false
 * if false move to check if (player isAlive is true) and (dealer.hasBlackJack is false)
 * creates new random card using getRandom()
 * loops through dealer array and updtaes the dom
 * calls update method so as
 */
standBtn.addEventListener("click", () => {
	if (dealer.sum >= 21 || player.sum >= 21) {
		dealer.isAlive = false;
	}

	if (dealer.isAlive === true && dealer.hasBlackJack === false) {
		let card = getRandomCard();
		dealer.cards.push(card);
		dealerCard.textContent = " ";
		dealerTotal.textContent = " ";
		dealer.sum += card;
		dealerTotal.textContent = dealer.sum;

		for (let i = 0; i < dealer.cards.length; i++) {
			dealerCard.textContent += dealer.cards[i] + " ";
		}
		updateCards();
	}
});

// doubles bet a wager when called
double.addEventListener("click", () => {
	if (bet.value >= 0) {
		bet.value = stake.value * 2;
		bet.textContent = bet.value;
	} else {
		messageOutput.textContent = "can't double negative bet";
	}
});
//

enterBtn.addEventListener("click", (e) => {
	e.preventDefault();

	while (stake.value <= 0) {
		loginMessage.textContent = "Stake can't be left empty, please enter stake to get logged in...";
		return;
	}

	homePage.style.display = "none";
	bet.textContent = stake.value;
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
