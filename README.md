
# ⚽ Soccer Memory Card Game

A fast-paced, React-powered memory challenge where you try to click each soccer player card *only once*. Each correct pick increases your score — but clicking the same card twice resets the round! The game keeps track of your all-time best score and reshuffles cards every turn to keep you guessing.

[🔗 Live Demo](https://memory-card-by-john-walter.vercel.app/)

---

## 🚀 About the Project

This project is built as part of **The Odin Project’s Full Stack JavaScript curriculum**.
It focuses on strengthening component architecture, state management, side-effects, and clean logic extraction in a React environment.

The gameplay logic is intentionally kept minimal, but the structure behind it emphasizes best practices in React app design.

---

## 🧠 Features

* **Dynamic shuffling** after every click to keep the game unpredictable.
* **Score tracking**:

  * Current round score
  * Best score saved across rounds
* **Duplicate-click detection** that ends the round and triggers score comparison.
* **External API image fetching** for card images.
* **Stateless child components** for clear separation of concerns.
* **Isolated utilities** for pure logic like shuffling and unique-card checking.

---

## 🛠️ Tech Stack

* **React** (via Vite)
* **JavaScript (ES6+)**
* **External soccer image API + SDK**
* **Modular CSS / basic styling**
* **Utility-based architecture** for pure functions
  (shuffle logic, data normalization, duplicate checking)

---

## 🧩 How It Works

### Game Flow

1. The app fetches soccer player images on initial load using `useEffect`.
2. Cards are rendered from a normalized array of `{ id, imageUrl }`.
3. When a user clicks a card:

   * The app checks if the card has been clicked before.
   * If it’s new → score increments.
   * If it’s a duplicate → game resets, best score updates if needed.
4. Cards are reshuffled after *every* click.
5. State is owned by the parent component, keeping child components stateless and clean.

### State Architecture

* `App` manages:

  * `clickedCards`
  * `score`
  * `bestScore`
  * `app restart`
  * fetched image data

* `Board` manages
  * Game logic through event handler
  * Passes the handler to cards

* Cards receive:
  * data props
  * callback handlers only (no direct state mutation)

This centralization keeps the logic consistent and predictable — and it mirrors the “Thinking in React” approach strategically. It also ensures no recreation of handlers while playing the game.

---

## 🧰 Project Structure

```
src/
│
├── components/
│   ├── Card.jsx
│   ├── CardGrid.jsx
│   └── Scoreboard.jsx
│
├── utils/
│   ├── shuffle functions
|   |—— shuffle until valid card is available
│   └── adapt GIFs to lightweight formets
│
├── App.jsx
└── main.jsx
```

Utilities are pure, side-effect-free functions — keeping components light and maximizing reuse.

---

## 📦 Skills Demonstrated

* **State lifting & minimal state design**
  Only essential values are stored; everything else is computed at render.
* **Side-effect management with `useEffect`**
  Clean, one-time fetch for remote card images.
* **Reusable event logic**
  Parent handlers passed to children via props.
* **Component composition**
  Small, focused components assembled into the full application.
* **Utility extraction**
  Separating transformation and computational logic from UI files.

---



## 📚 References

* [The Odin Project — Memory Card Assignment](https://www.theodinproject.com/lessons/node-path-react-new-memory-card)

---