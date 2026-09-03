# ♠️ Poker App

Een online pokerspel, gebouwd vanaf nul in TypeScript — met eigen implementatie van
handevaluatie en real-time odds-berekening op basis van kansrekening.

> 🚧 **Status:** In ontwikkeling — fase 1 (lokale 2-speler versie)

## Waarom dit project?

Als vervolg op mijn groepsproject [Exploding Kittens](#) (een multiplayer kaartspel
gebouwd tijdens mijn opleiding Toegepaste Informatica aan de PXL), wilde ik een
complexer kaartspel bouwen dat dieper ingaat op spellogica én kansrekening — een vak
dat ik tijdens mijn opleiding volgde en hier praktisch toepas via de odds-calculator.

## Features

### ✅ Fase 1 — Kernlogica
- [ ] Kaartdeck: aanmaken en shuffelen
- [ ] Handevaluatie (paar, flush, straight, full house, ...)
- [ ] Unit tests voor alle hand-rankings

### ✅ Fase 2 — 2-speler lokale versie
- [ ] Inzetrondes, potten, all-in, showdown
- [ ] Live win-kans indicator tijdens het spel

### 🔜 Fase 3 — Multiplayer via WebSockets
- [ ] Server-side game state management
- [ ] Real-time synchronisatie tussen spelers

### 🔜 Fase 4 — Meerdere spelers (3-6)
- [ ] Dealer button, blinds, side-pots

### 🔜 Fase 5 — AI-spelers
- [ ] Regelgebaseerde beslissingen op basis van hand-sterkte en pot odds

## Tech stack

- **Taal:** TypeScript
- **Front-end:** HTML, CSS, TypeScript (framework-keuze volgt in latere fase indien nodig)
- **Testing:** *(toe te voegen — bv. Vitest of Jest)*
- **Back-end (fase 3+):** *(toe te voegen — bv. Node.js + Socket.io)*

## Lokaal draaien

```bash
git clone https://github.com/MaartenVandersteenPXL/poker-app.git
cd poker-app
npm install
npm run dev
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

Maarten Vandersteen — student Toegepaste Informatica (Professionele Bachelor) aan de PXL Hogeschool.

- [GitHub](https://github.com/MaartenVandersteenPXL)
- [LinkedIn](#)
