import {Player, Status} from "../models/Player";
import {Deck} from "../models/Deck";
import {Card} from "../models/Card";
import {determineHandStrength, HandResult} from "./handEvaluator";

export enum Action {Fold, Check, Call, Bet}

export class GameEngine {
    private pot : number;
    private players : Player[];
    private deck : Deck;
    private currentBet: number;
    private turn : number;
    private currentRoundBet : number[] = [];
    constructor(players : Player[],deck : Deck) {
        this.players = players;
        this.deck = deck;
        this.pot = 0;
        this.turn = 0;
        this.currentBet = 0;
        for(let i =0; i<this.players.length; i++) {
            this.currentRoundBet.push(0)
        }
    }

    public dealCards() {
        this.deck.shuffle();
        for(let i = 0; i<5; i++){
            for(let j = 0; j < this.players.length; j++) {
                let card : Card = this.deck.draw();
                this.players[j].receiveCard(card)
            }
        }

    }

    public processRound() {
        if(this.turn<this.players.length-1) {
            this.turn++
        } else {
            this.turn = 0;
        }
    }

    public processAction(action : Action, bet : number) {
        switch (action) {
            case Action.Fold:
                this.players[this.turn].fold();
                break;
            case Action.Check:
                break;
            case Action.Call:
                this.processBet(this.currentBet);
                break;
            case Action.Bet:
                this.processBet(this.currentBet + bet);
                break;
        }
        this.processRound()
    }

    private processBet(roundTotal : number) : void {
        const onTable: number = this.currentRoundBet[this.turn];
        const amount: number = roundTotal - onTable;

        const addedAmount: number = this.players[this.turn].placeBet(amount);

        this.currentRoundBet[this.turn] = onTable + addedAmount;
        this.pot += addedAmount;

        if (roundTotal > this.currentBet) {
            this.currentBet = roundTotal;
        }
    }

    public isBettingRoundFinished() : boolean {
        let counter : number = 0;
        for(let i=0; i <this.players.length; i++) {
            if(this.players[i].currentStatus == Status.Active) {
                if(this.currentRoundBet[i]==this.currentBet) {
                    counter++;
                }
            } else { counter++ ;}
        }
        return counter == this.players.length;
    }

    public hasWinnerByFold() : boolean {
        let counter : number = 0;
        for(let i=0; i <this.players.length; i++) {
            if(this.players[i].currentStatus == Status.Active || this.players[i].currentStatus == Status.AllIn) {
                counter++
            }
        }
        return counter == 1;
    }

    public showdown() : Player []{
        let results : HandResult[] = [];

        for(let i=0; i <this.players.length; i++) {
            if(this.players[i].currentStatus == Status.Active || this.players[i].currentStatus == Status.AllIn) {
                results[i] = determineHandStrength(this.players[i].currentHand)
            }
        }
        let winninghand : HandResult = results[0];
        let winners : Player[] = [this.players[0]]
        for(let i=1; i <this.players.length; i++) {
            if(results[i].category>winninghand.category) {
                winninghand = results[i];
                winners.length = 0;
                winners[0] = this.players[i];
            }
            else if(results[i].category==winninghand.category) {
                let tiecounter : number = 0;
                for(let j = 0; j < results[i].tiebreakers.length; j++) {
                    if(results[i].tiebreakers[j] > winninghand.tiebreakers[j]) {
                        winninghand = results[i];
                        winners.length = 0;
                        winners[0] = this.players[i];
                        break;
                    }
                    if(results[i].tiebreakers[j] == winninghand.tiebreakers[j]) {
                        tiecounter++;
                        if(tiecounter == results[i].tiebreakers.length) {
                            winners.push(this.players[i]);
                        }
                    }
                }
            }

        }
        if(winners.length>1) {
            this.pot /= winners.length;
        }
        for(let i = 0; i<winners.length; i++) {
            winners[i].collectPot(this.pot)
        }

        return winners;

    }

    public state() {

    }
}