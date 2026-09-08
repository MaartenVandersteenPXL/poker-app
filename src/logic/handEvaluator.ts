import {Card, Rank} from "../models/Card";


export enum HandStrength {HighCard, Pair, TwoPair, ThreeOfAKind,
Straight, Flush, FullHouse,Quads, StraightFlush, RoyalFlush}

export interface HandResult {
    category: HandStrength;
    tiebreakers : number[];
}

export function determineHandStrength(hand : Card[]) : HandResult {
    let tiebreakers : number[] = getTiebreakers(hand)
    let steelWheel : number[] = [5, 4, 3, 2, 14]
    if(isFlush(hand) && isStraight(hand) && tiebreakers[0] == 14 ) {
        return {category : HandStrength.RoyalFlush, tiebreakers}
    }
    else if(isFlush(hand) && isStraight(hand)) {
        return {category : HandStrength.StraightFlush, tiebreakers};
    }
    else if(isFlush(hand) && isSteelWheel(hand)) {
        tiebreakers = steelWheel
        return{ category : HandStrength.StraightFlush, tiebreakers}
    }
    else if(isQuads(hand)) {
        return {category : HandStrength.Quads, tiebreakers};
    }
    else if(isFullHouse(hand)) {
        return {category : HandStrength.FullHouse, tiebreakers}
    }
    else if(isFlush(hand)) {
        return {category : HandStrength.Flush, tiebreakers}
    }
    else if(isStraight(hand)) {
        return {category : HandStrength.Straight, tiebreakers}
    }
    else if(isSteelWheel(hand)) {
        tiebreakers = steelWheel
        return{ category : HandStrength.Straight, tiebreakers}
    }
    else if(isThreeOfAKind(hand)) {
        return {category : HandStrength.ThreeOfAKind, tiebreakers}
    }
    else if(isTwoPair(hand)) {
        return {category : HandStrength.TwoPair, tiebreakers}
    }
    else if(isPair(hand)) {
        return {category : HandStrength.Pair, tiebreakers}
    }
    else {
        return {category : HandStrength.HighCard, tiebreakers}
    }

}

function getRankFrequencies(hand : Card[]) : Map<Rank, number> {
    let frequencies = new Map<Rank, number>;
    for(let i=0; i<hand.length; i++ ) {
        let teller : number = 1;
        if(frequencies.has(hand[i].rank)) {
            teller = frequencies.get(hand[i].rank)!
            teller++;

        }
        frequencies.set(hand[i].rank, teller)
    }
    return frequencies
}

function getTiebreakers(hand : Card[]) : number[] {
    let frequencies = getRankFrequencies(hand);
    let references = Array.from(frequencies.entries());
    references.sort((a, b) => {
        if (a[1] !== b[1]) {
            return b[1] - a[1]
        } return b[0] -a[0]
    })
    let tiebreakers : number[] = references.map((reference) : number => reference[0])
    return tiebreakers
}

function isFlush(hand : Card[]) : boolean {
    let teller : number = 0;
    for(let i = 1; i<hand.length; i++){
        if(hand[0].suit == hand[i].suit) {
            teller++
        }
    }
    return teller == 4;
}

function isPair(hand : Card[]) : boolean {
    let frequencies = getRankFrequencies(hand);
    let reference : number[] = Array.from(frequencies.values());
    return reference.includes(2)
}

function isTwoPair(hand : Card[]) : boolean {
    let frequencies = getRankFrequencies(hand);
    let reference : number[] = Array.from(frequencies.values());
    let filter : number[] = reference.filter(num => num == 2);
    return filter.length == 2
}

function isThreeOfAKind(hand : Card[]) : boolean {
    let frequencies = getRankFrequencies(hand);
    let reference : number[] = Array.from(frequencies.values());
    return reference.includes(3)
}

function isFullHouse(hand : Card[]) : boolean {
    let frequencies = getRankFrequencies(hand);
    let reference : number[] = Array.from(frequencies.values());
    return reference.includes(3) && reference.includes(2)
}

function isQuads(hand : Card[]) : boolean {
    let frequencies = getRankFrequencies(hand);
    let reference : number[] = Array.from(frequencies.values());
    return reference.includes(4)
}

function isStraight(hand : Card[]) : boolean {
    let frequencies = getRankFrequencies(hand);
    let teller1 : number = 0;
    if (frequencies.size == 5) {
        let reference : number[] = Array.from(frequencies.keys());
        reference.sort((a,b) => a - b);
        for( let i = 1; i< reference.length; i++) {
            if(reference[i-1] + 1 == reference[i]) {
                teller1++
            }
        }
    }
    return teller1 == 4
}

function isSteelWheel(hand : Card[]) : boolean {
    let frequencies = getRankFrequencies(hand);
    let reference : number[] = Array.from(frequencies.keys());
    return reference.includes(2) && reference.includes(3) && reference.includes(4)
            && reference.includes(5) && reference.includes(14)
}