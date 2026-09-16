import {Card} from "./Card";
export enum Status{Eliminated, Active, AllIn, Folded}

export class Player {
    public readonly name: string
    private readonly hand : Card [] = [];
    private chips : number;
    private status : Status = Status.Active
    constructor(name : string, chips : number) {
        this.name = name;
        this.chips = chips;
    }

    public placeBet(bet : number) : number {
        if(this.status != Status.Active) {
            throw new Error("can't place bet when not in game or when all-in")
        }
        if(bet >= this.chips )
        { bet = this.chips;
            this.status=Status.AllIn;
        }
        this.chips -= bet;
        return bet;
    }

    public receiveCard(card : Card) : void {
        this.hand.push(card)
    }

    public fold() : void {
        if(this.status != Status.Active) {
            throw new Error("player can not fold in current situation")
        } else {this.status = Status.Folded;}
    }

    get currentChips() : number {
        return this.chips
    }

    get currentHand() : Card [] {
        let copy = [...this.hand];
        return copy
    }

    get currentStatus() : Status {
        return this.status
    }

    public collectPot(pot : number) : void {
        this.chips += pot
    }

}