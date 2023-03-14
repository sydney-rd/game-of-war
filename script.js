// game of war class 
class gameOfWar {
    constructor() {
        this.p1 = [];
        this.p2 = [];
        this.deck = new Deck();
        this.shuffleDeck();
        this.splitDeck();
        this.pile = [];
    }
    shuffleDeck() {
        for (let i = this.deck.cards.length - 1; i > 0; i-- ) {
            let j = Math.floor(Math.random() * i);
            let temp = this.deck.cards[i];
            this.deck.cards[i] = this.deck.cards[j];
            this.deck.cards[j] = temp;
        }
    }
    splitDeck() {
        let splitDeck = Math.ceil(this.deck.cards.length/2);
        let halfDeck = this.deck.cards.splice(0, splitDeck);
        this.p1.push(...halfDeck);
        this.p2.push(...this.deck.cards);
        delete this.deck // deletes original array holding 52 cards
    }
    
    startGame() {
        // while loop until a player has 0 cards left 
        while (this.p1.length !== 0 && this.p2.length !== 0 ) {
        let p1Card = this.p1.pop();
        let p2Card = this.p2.pop();
        if (p1Card.score === p2Card.score) {  
            console.log(`PLAYER 1: ${p1Card.suit} of ${p1Card.rank} with ${this.p1.length} amt of cards -- PLAYER 2: ${p2Card.suit} of ${p2Card.rank} with ${this.p2.length} amt of cards...WAR!`);
            this.pile.push(p1Card, p2Card);
            this.war();
        } else if (p1Card.score > p2Card.score) { 
            console.log(`PLAYER 1: ${p1Card.suit} of ${p1Card.rank} with ${this.p1.length} amt of cards -- PLAYER 2: ${p2Card.suit} of ${p2Card.rank} with ${this.p2.length} amt of cards -- PLAYER 1 wins this round!`);
            this.p1.unshift(p2Card, p1Card, ...this.pile);
            this.pile.length = 0; // clear pile 
        } else {
            console.log(`PLAYER 1: ${p1Card.suit} of ${p1Card.rank} with ${this.p1.length} amt of cards -- PLAYER 2: ${p2Card.suit} of ${p2Card.rank} with ${this.p2.length} amt of cards -- PLAYER 2 wins this round!`);
            this.p2.unshift(p1Card, p2Card, ...this.pile);
            this.pile.length = 0; // clear pile     
        }
    }
    // winning conditionals when while loop breaks
    if (this.p1.length === 0) {
        this.p1.unshift(...this.pile)
        this.pile.length = 0; // clear pile     
        console.log(`Player 2 wins entire game, they have ${this.p2.length} cards`); 
    } else if (this.p2.length === 0) {
        this.p2.unshift(...this.pile)
        this.pile.length = 0; // clear pile 
        console.log(`Player 1 wins entire game, they have ${this.p1.length} cards`); 
    }
} 
    // player 1 and 2 are not having the cards push properly !!!
    war() {
        if (this.p1.length <= 3) {
            this.pile.push(...this.p2)
            // player 1 loses
            this.p1.length = 0
        } else if (this.p2.length <= 3) {
            // player 2 loses
            this.pile.push(...this.p1)
            this.p2.length = 0
        } else {
            this.pile.push(...this.p1.splice(this.p1.length - 3, 3)); // removes 3 cards
            this.pile.push(...this.p2.splice(this.p2.length - 3, 3));
        }
    }
}

// creates a car with suit, rank, and score
class Card {
    constructor(suit, rank, score) {
        this.suit = suit;
        this.rank = rank;
        this.score = score;
    }
}

// creates a deck by pushing a suit, rank and its value to each card equaling 52
class Deck {
    constructor() {
        const suits = ["Hearts", "Clubs", "Spades", "Diamonds"];
        const rank = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
        this.cards = [];
        for (let i = 0; i < rank.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                this.cards.push(new Card(suits[j], rank[i], i+1));
            }
        }
    }    
}

// test code
// calls card and deck class
// const test_deck = new Deck();
// console.log(test_deck)

// calls and tests the split function
// const game = new Game();
// console.log(game.p1);
// console.log("split")
// console.log(game.p2);
let game = new gameOfWar();
// game1.gameInit();
game.startGame();
