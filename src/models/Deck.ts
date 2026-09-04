import {Rank, Suit, Card} from "./Card";



export class Deck {
    private deck : Card[] = []
    constructor() {

        for(let i = 2; i<=14 ; i++){
            for(let j =0; j<=3; j++) {
                let card = new Card(i, j)
                this.deck.push(card)
            }
        }
    }

    public shuffle() : void {
        for(let i = 51; i>0; i--) {
            let r : number = Math.floor(Math.random() * (i+1));
            [this.deck[i], this.deck[r]] = [this.deck[r], this.deck[i]];
        }

    }

    public draw() : Card {
        if(this.deck.length !== 0) {
            return this.deck.pop()!;
        } else {
            throw new Error("the deck is empty")
        }
    }
}