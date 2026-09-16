import {Player, Status} from "../models/Player";
import {Deck} from "../models/Deck";
import {Card} from "../models/Card";
import {determineHandStrength, HandResult} from "./handEvaluator";

export enum Action {Fold, Check, Call, Bet}

export interface Splitpot {
    amount : number;
    possibleWinners : Player [];
}

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

    public processRound() : void {
        if (this.players.filter((player) => player.currentStatus == Status.Active).length != 0) {
            do {
                if (this.turn < this.players.length - 1) {
                    this.turn++;
                } else {
                    this.turn = 0;
                }
            } while (this.players[this.turn].currentStatus !== Status.Active);
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
        return this.players.filter((player) => player.currentStatus == Status.AllIn || player.currentStatus == Status.Active).length == 1;
    }

    public isSidePotNecessary() : boolean {
        return this.players.some((player) => player.currentStatus == Status.AllIn);
    }

    public decideWinners(candidates : Player []) : Player []{
        let results : HandResult[] = [];
        let winners : Player[] = [];
        let possiblewinners : Player[] = [];
        if(candidates.length == 1) {
            let winner = candidates[0];
            winners.push(winner);
            return winners;
        }

        for(let i=0; i <candidates.length; i++) {
            if(candidates[i].currentStatus == Status.Active || candidates[i].currentStatus == Status.AllIn) {
                    results.push(determineHandStrength(candidates[i].currentHand));
                    possiblewinners.push(candidates[i]);
                }
        }

        let winninghand : HandResult = results[0];
        winners.push(possiblewinners[0]);

        for(let i=1; i <possiblewinners.length; i++) {
            if(results[i].category>winninghand.category) {
                winninghand = results[i];
                winners.length = 0;
                winners[0] = possiblewinners[i];
            }
            else if(results[i].category==winninghand.category) {
                let tiecounter : number = 0;
                for(let j = 0; j < results[i].tiebreakers.length; j++) {
                    if(results[i].tiebreakers[j] > winninghand.tiebreakers[j]) {
                        winninghand = results[i];
                        winners.length = 0;
                        winners[0] = possiblewinners[i];
                        break;
                    }
                    if(results[i].tiebreakers[j] == winninghand.tiebreakers[j]) {
                        tiecounter++;
                        if(tiecounter == results[i].tiebreakers.length) {
                            winners.push(possiblewinners[i]);
                        }
                    }
                }
            }
        }
        return winners;

    }

    public awardPot(winners : Player[], award : number) : void {
        if(winners.length == 1) {
            winners[0].collectPot(award)
        }
        else {
            let splitpot : number =Math.floor(award / winners.length);
            let rest : number = award % winners.length;
            winners.forEach((winner) => {
                winner.collectPot(splitpot)
            })
            if(rest != 0) {
                let random : number = Math.floor(Math.random() * winners.length)
                winners[random].collectPot(rest)
            }
        }

    }



    public createSidePots() : Splitpot[] {
        let playersBets : [Player, number] [] = [];
        let splitPot : Splitpot[] = [];
        for(let i = 0; i<this.currentRoundBet.length; i++) {
            playersBets.push([this.players[i], this.currentRoundBet[i]]);
        }
        while(playersBets.some((playerBet) => playerBet[1] >0)) {
            let amount : number = 0;
            let possibleWinners : Player[] = [];
            let lowestbet =Math.min(...playersBets.filter((playerbet) => playerbet[1] >0).map((playerBet) => playerBet[1]));
            for(let i = 0; i<playersBets.length ; i++) {
                if(playersBets[i][1] > 0) {
                    amount += lowestbet;
                    playersBets[i][1] -= lowestbet
                    if(playersBets[i][0].currentStatus == Status.Active || playersBets[i][0].currentStatus == Status.AllIn) {
                        possibleWinners.push(playersBets[i][0]);
                    }

                }

            }
            let result : Splitpot = {amount, possibleWinners}
            splitPot.push(result)
        }
        return splitPot;
    }

    public resolveShowdown() : void {
        if(!this.isSidePotNecessary()) {
            let candidates : Player[] = this.players.filter((player) => player.currentStatus == Status.AllIn || player.currentStatus == Status.Active);
            let winners : Player [] = this.decideWinners(candidates);
            this.awardPot(winners, this.pot)
        }
        else {
            let playerspots : Splitpot[] = this.createSidePots();
            playerspots.forEach((playerspot, index) => {
                let candidates : Player[] = playerspot.possibleWinners;
                let amount : number = playerspot.amount;
                let winners : Player[] = this.decideWinners(candidates);
                this.awardPot(winners, amount);
            })

        }
    }

    public state() {

    }


    // added for gameEngine.test


}