import { describe, it, expect } from "vitest";
import {Deck} from "../src/models/Deck";

describe("Deck", () => {
    it("should contain an array of 52 Cards", () => {
        let deck1 : Deck = new Deck();
        for(let i=0;i<=51; i++) {
            deck1.draw()
        }
        expect(() => {deck1.draw()}).toThrow("the deck is empty")
    })
})