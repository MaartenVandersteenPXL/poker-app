# ♠️ Poker App

Een pokerspel, gebouwd vanaf nul in TypeScript, met een eigen implementatie van
handevaluatie en (binnenkort) real-time odds-berekening op basis van kansrekening.

Het spel wordt eerst uitgewerkt als **five-card draw** (elke speler krijgt 5 kaarten). Daarna wordt het
uitgebreid naar **Texas Hold'em**.

> 🚧 **Status:** In ontwikkeling. De spellogica (fase 1 en 2) staat en is getest; de gebruikersinterface en de odds-calculator volgen.

## Waarom dit project?

Als vervolg op mijn groepsproject Exploding Kittens (een multiplayer kaartspel
gebouwd tijdens mijn opleiding Toegepaste Informatica aan de PXL) wilde ik een
complexer kaartspel bouwen dat dieper ingaat op spellogica én kansrekening, een vak
dat ik tijdens mijn opleiding volgde en hier praktisch toepas via de odds-calculator.

## Features

### ✅ Fase 1: Kernlogica (five-card draw)
- [x] Kaartdeck van 52 kaarten aanmaken en schudden (Fisher-Yates)
- [x] Handevaluatie: van high card tot royal flush, inclusief de "wheel" (A-2-3-4-5) en tiebreakers bij gelijke handen
- [x] Unit tests voor alle hand-rankings

### 🚧 Fase 2: 2-speler lokale versie
- [x] Kaarten delen en beurtverloop (fold, check, call, bet)
- [x] Inzetrondes, pot, all-in en showdown
- [x] Side pots bij all-in, inclusief verdeling bij gelijke winnaars
- [x] Unit tests voor het spelverloop en de side pots
- [ ] Odds-calculator op basis van kansrekening
- [ ] Live win-kans indicator tijdens het spel
- [ ] Speelbare gebruikersinterface

### 🔜 Fase 3: Multiplayer via WebSockets
- [ ] Server-side game state management
- [ ] Real-time synchronisatie tussen spelers

### 🔜 Fase 4: Meerdere spelers (3-6)
- [ ] Dealer button, blinds en uitgebreide side pots

### 🔜 Fase 5: AI-spelers
- [ ] Regelgebaseerde beslissingen op basis van hand-sterkte en pot odds

### 🔜 Fase 6: Texas Hold'em
- [ ] 2 eigen kaarten per speler en 5 gemeenschappelijke kaarten (flop, turn, river)
- [ ] Beste hand van 5 kiezen uit 7 kaarten
- [ ] Inzetrondes per fase: pre-flop, flop, turn en river

## Tech stack

- **Taal:** TypeScript
- **Front-end:** HTML, CSS, TypeScript (framework-keuze volgt in een latere fase indien nodig)
- **Testing:** Vitest
- **Back-end (fase 3+):** nog te kiezen, bv. Node.js + Socket.io

## Lokaal draaien

De gebruikersinterface is nog in ontwikkeling. Voorlopig kan je de spellogica uitproberen via de tests:

```bash
git clone https://github.com/MaartenVandersteenPXL/poker-app.git
cd poker-app
npm install
npm test
```

## Projectstructuur

```
src/
├── models/       # Card, Deck, Player klassen
├── logic/        # Handevaluatie, odds-berekening, spelverloop
├── ui/           # Weergave en interactie
└── main.ts       # Entry point
tests/            # Unit tests
```

## Auteur

Maarten Vandersteen, student Toegepaste Informatica (Professionele Bachelor) aan Hogeschool PXL.

- [GitHub](https://github.com/MaartenVandersteenPXL)
