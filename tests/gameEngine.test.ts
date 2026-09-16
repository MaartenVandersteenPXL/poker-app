import {describe, expect, it} from "vitest";
import {Player} from "../src/models/Player";
import {Deck} from "../src/models/Deck";
import {Action, GameEngine} from "../src/logic/gameEngine";
import {Card} from "../src/models/Card";

describe("GameEngine.dealCards", () => {
    it("should give each player exactly five cards", () => {
        let maarten : Player = new Player("Maarten", 1500)
        let evy : Player = new Player("Evy", 1500)
        let deck = new Deck();
        let players : Player[] = [maarten, evy]
        let game : GameEngine = new GameEngine(players, deck);
        game.dealCards();
        expect(maarten.currentHand.length).toEqual(5)
        expect(evy.currentHand.length).toEqual(5)
    })
})

describe("GameEngine.hasWinnerByFold", () => {
    it("should award pot to only remaining player", () => {
        let maarten : Player = new Player("Maarten", 1500)
        let evy : Player = new Player("Evy", 1500)
        let deck = new Deck();
        let players : Player[] = [maarten, evy]
        let game : GameEngine = new GameEngine(players, deck);
        game.dealCards();
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Call, 500);
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Fold, 0);
        game.resolveShowdown()
        expect(maarten.currentChips).toEqual(2000);
        expect(evy.currentChips).toEqual(1000);
    })
})

describe("GameEngine.decideWinners", () => {
    it("should award pot to player with strongest hand", () => {
        let maarten: Player = new Player("Maarten", 1500)
        let evy: Player = new Player("Evy", 1500)
        let deck = new Deck();
        let players: Player[] = [maarten, evy]
        maarten.receiveCard(new Card(14, 0));
        maarten.receiveCard(new Card(14, 1));
        maarten.receiveCard(new Card(14, 2));
        maarten.receiveCard(new Card(13, 0));
        maarten.receiveCard(new Card(13, 1));
        evy.receiveCard(new Card(10, 0));
        evy.receiveCard(new Card(9, 1));
        evy.receiveCard(new Card(8, 2));
        evy.receiveCard(new Card(7, 0));
        evy.receiveCard(new Card(6, 0));
        let game: GameEngine = new GameEngine(players, deck);
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Call, 500);
        game.resolveShowdown()
        expect(maarten.currentChips).toEqual(2500);
        expect(evy.currentChips).toEqual(500);
    })
})

describe("GameEngine.createsidepots", () => {
    it("should create correct sidepots and award correct winners", () => {
        let maarten: Player = new Player("Maarten", 500)
        let kato : Player = new Player("Kato", 1000)
        let evy: Player = new Player("Evy", 1500)
        let deck = new Deck();
        let players: Player[] = [maarten, evy, kato]
        maarten.receiveCard(new Card(14, 0));
        maarten.receiveCard(new Card(14, 1));
        maarten.receiveCard(new Card(14, 2));
        maarten.receiveCard(new Card(13, 0));
        maarten.receiveCard(new Card(13, 1));
        evy.receiveCard(new Card(10, 0));
        evy.receiveCard(new Card(9, 1));
        evy.receiveCard(new Card(8, 2));
        evy.receiveCard(new Card(7, 0));
        evy.receiveCard(new Card(6, 0));
        kato.receiveCard(new Card(12, 0));
        kato.receiveCard(new Card(12, 1));
        kato.receiveCard(new Card(9, 2));
        kato.receiveCard(new Card(9, 0));
        kato.receiveCard(new Card(6, 3));
        let game: GameEngine = new GameEngine(players, deck);
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Call, 0);
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Call, 0);
        game.resolveShowdown()
        expect(maarten.currentChips).toEqual(1500);
        expect(evy.currentChips).toEqual(1500);
        expect(kato.currentChips).toEqual(0);
    })
})

describe("GameEngine.createsidepots, with fold", () => {
    it("should create correct sidepots and award correct winners", () => {
        let maarten: Player = new Player("Maarten", 500)
        let kato : Player = new Player("Kato", 1000)
        let evy: Player = new Player("Evy", 1500)
        let deck = new Deck();
        let players: Player[] = [maarten, evy, kato]
        maarten.receiveCard(new Card(14, 0));
        maarten.receiveCard(new Card(14, 1));
        maarten.receiveCard(new Card(14, 2));
        maarten.receiveCard(new Card(13, 0));
        maarten.receiveCard(new Card(13, 1));
        evy.receiveCard(new Card(10, 0));
        evy.receiveCard(new Card(9, 1));
        evy.receiveCard(new Card(8, 2));
        evy.receiveCard(new Card(7, 0));
        evy.receiveCard(new Card(6, 0));
        kato.receiveCard(new Card(12, 0));
        kato.receiveCard(new Card(12, 1));
        kato.receiveCard(new Card(9, 2));
        kato.receiveCard(new Card(9, 0));
        kato.receiveCard(new Card(6, 3));
        let game: GameEngine = new GameEngine(players, deck);
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Call, 0);
        game.processAction(Action.Bet, 500);
        game.processAction(Action.Fold, 0);
        game.resolveShowdown()
        expect(maarten.currentChips).toEqual(1500);
        expect(evy.currentChips).toEqual(1000);
        expect(kato.currentChips).toEqual(500);
    })
})
