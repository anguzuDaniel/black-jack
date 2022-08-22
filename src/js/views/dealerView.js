import view from "./view";

class DealerView extends view {
	_shuffleBtn = document.getElementById("shuffleBtn");
	_dealbtn = document.getElementById("deal-cards");
	_handleBtn = document.getElementById("handle-bet");

    constructor() {
        super();
    }
    
    shuffledCard() {
        this._shuffleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            super.createDeck();
        })
    }
}

export default new DealerView();

