import {describe, expect, it} from "vitest";
import {Card} from "../src/models/Card";
import {determineHandStrength, HandResult, HandStrength} from "../src/logic/handEvaluator";


function buildHand(waardes : [number, number][]) :  Card[] {
    let hand : Card[] = waardes.map((waarde)=>new Card(waarde[0], waarde[1]));
    return hand
}

function buildResult(category : HandStrength, tiebreakers : number[]) : HandResult {
    return {category, tiebreakers}
}

describe("handEvaluator", ()  => {
    it("should return Straight Flush Steel Wheel", () => {
        let hand : Card [] = buildHand([[2,2],[3,2],[4,2],[5,2],[14,2]]);
        let result : HandResult =buildResult(HandStrength.StraightFlush, [5, 4, 3, 2, 14]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Full House", () => {
        let hand : Card[] = buildHand([[11,1],[11,2],[11,3],[12,1],[12,2]]);
        let result : HandResult = buildResult(HandStrength.FullHouse, [11,12]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Quads", () => {
            let hand : Card[] = buildHand([[14,0],[14,1],[14,2],[14,3],[9,2]]);
            let result : HandResult = buildResult(HandStrength.Quads, [14,9]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Two Pair", () => {
        let hand : Card[] = buildHand([[7,0],[2,1],[7,1],[2,3],[5,2]]);
        let result : HandResult = buildResult(HandStrength.TwoPair, [7,2,5]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Straight", () => {
        let hand : Card[] = buildHand([[7,0],[5,1],[6,3],[4,3],[8,0]]);
        let result : HandResult = buildResult(HandStrength.Straight, [8,7,6,5,4]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Royal Flush", () => {
        let hand : Card[] = buildHand([[14,0],[10,0],[13,0],[11,0],[12,0]]);
        let result : HandResult = buildResult(HandStrength.RoyalFlush, [14,13,12,11,10]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Straight Flush", () => {
        let hand : Card[] = buildHand([[7,0],[10,0],[8,0],[11,0],[9,0]]);
        let result : HandResult = buildResult(HandStrength.StraightFlush, [11,10,9,8,7]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Flush", () => {
        let hand : Card[] = buildHand([[13,0],[5,0],[9,0],[2,0],[8,0]]);
        let result : HandResult = buildResult(HandStrength.Flush, [13,9,8,5,2]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Straight Steel Wheel", () => {
        let hand : Card[] = buildHand([[14,0],[5,1],[2,3],[4,3],[3,0]]);
        let result : HandResult = buildResult(HandStrength.Straight, [5,4,3,2,14]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Three Of A Kind", () => {
        let hand : Card[] = buildHand([[7,0],[7,1],[6,3],[14,3],[7,3]]);
        let result : HandResult = buildResult(HandStrength.ThreeOfAKind, [7,14,6]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return Pair", () => {
        let hand : Card[] = buildHand([[7,0],[5,1],[6,3],[14,3],[6,0]]);
        let result : HandResult = buildResult(HandStrength.Pair, [6,14,7,5]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
    it("should return High Card", () => {
        let hand : Card[] = buildHand([[7,0],[10,1],[2,3],[14,3],[8,0]]);
        let result : HandResult = buildResult(HandStrength.HighCard, [14,10,8,7,2]);
        expect(determineHandStrength(hand)).toEqual(result);
    })
})