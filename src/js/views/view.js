import { SUITS, CARDS, DECK } from "./cards";

class view {
	_data;

	// renders an error message tothe screen when called
	renderError(message = this.message) {
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

	// create a deck when called
	createDeck() {
		DECK = new Array();

		// loops through through the cards
		for (let i = 0; (i = CARDS.length); i++) {
			// loops though the suits and
			// checks the weight of the cards
			for (let j = 0; (j = SUITS.length); j++) {
				let weight = parseInt(CARDS[i]);

				// checks of cards is "J" | "Q" | "K" if so, it sets the weight of the particular card to 10
				if (CARDS[i] === "J" || CARDS[i] == "Q" || CARDS[i] == "K") {
					weight = 10;
				}

				// check is a card is "A" if true, sets the weight of card to 11
				if (CARDS[i] == "A") {
					weight = 11;
				}

				const card = { value: CARDS[i], suit: SUITS[j], weight: weight };
				DECK.push(card);
			}
		}
	}
}

export default new Veiw();
