export enum Rank{Two = 2, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Ace}
export enum Suit {Hearts, Clubs, Spades, Diamonds}

export class Card {
    constructor(public readonly rank : Rank,public readonly suit : Suit) {

    }

    public toString(): string {
        return Rank[this.rank]+ " of " + Suit[this.suit];
    }
}

