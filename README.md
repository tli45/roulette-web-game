# Roulette Web Game

An interactive browser-based roulette game built with vanilla JavaScript, HTML, and CSS.

## Features

- Animated roulette ball spin with realistic deceleration
- Number guessing (1-36) with customizable bet amounts
- Win/Lose modal popups with result display
- Persistent money tracking across rounds
- "Add Money" option when balance hits zero
- 36x payout on correct guess (standard single-number odds)

## How to Play

1. Open `index.html` in a browser
2. Pick a number from 1 to 36
3. Enter your bet amount
4. Click **START** — the ball spins and decelerates to a stop
5. If your number matches, you win 36x your bet

## Tech Stack

- **HTML** — game layout and modals
- **CSS** — centered single-page design with Google Fonts (Merriweather)
- **JavaScript** — spin physics, pocket mapping, bet validation, modal control

## File Structure

```
├── index.html        # Main game page
├── style.css         # Styles
├── script.js         # Game logic
└── images/
    ├── roulette.png  # Wheel image
    ├── win.png       # Win modal image
    ├── lose.png      # Lose modal image
    └── laugh.png     # No money modal image
```
