# 🕹️ Trivia Game Sonnet

A neon arcade-styled trivia game built with **React**, **Vite**, and **Tailwind CSS v3**, powered by the [Open Trivia Database](https://opentdb.com/) API. This project was built as a learning exercise to demonstrate core modern web development concepts.

---

## 🎮 What It Does

- Choose a trivia category, difficulty, and number of questions (or hit Begin for a random quiz)
- Answer multiple choice questions with instant correct/incorrect feedback
- Track your score through the game and see your final result with a percentage

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| [React](https://react.dev/) | UI component framework |
| [Vite](https://vitejs.dev/) | Development server and build tool |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first CSS styling |
| [Open Trivia DB](https://opentdb.com/) | Free trivia question API |

---

## 📁 Project Structure

```
trivia-game-sonnet/
├── public/                  # Static assets (favicon etc.)
├── src/
│   ├── components/
│   │   ├── AmountSelector.jsx    # Dropdown: number of questions
│   │   ├── AnswerButton.jsx      # Individual answer option button
│   │   ├── Button.jsx            # Reusable button component
│   │   ├── CategorySelector.jsx  # Dropdown: trivia category
│   │   ├── DifficultySelector.jsx # Dropdown: easy/medium/hard
│   │   └── QuestionCard.jsx      # Displays question + answer buttons
│   ├── App.css              # Minimal global styles
│   ├── App.jsx              # Main app component - holds all game state
│   ├── index.css            # Tailwind directives (@tailwind base/components/utilities)
│   └── main.jsx             # Entry point - mounts React into index.html
├── index.html               # Single HTML shell with <div id="root">
├── tailwind.config.js       # Tailwind config - custom neon colors, fonts, shadows
├── postcss.config.js        # PostCSS config - wires Tailwind into the build
├── vite.config.js           # Vite config
└── package.json             # Project dependencies and scripts
```

---

## 🧠 Key Concepts Demonstrated

### React Components
The UI is broken into small reusable pieces called components. Each component lives in its own `.jsx` file and is responsible for one thing. For example `Button.jsx` handles all buttons in the app — color and size are passed in as **props**:

```jsx
<Button label="BEGIN" color="green" size="lg" onClick={fetchQuestions} />
```

### useState
React's `useState` hook creates variables that the app watches. When they change, React automatically updates the UI:

```jsx
const [screen, setScreen] = useState('welcome')  // tracks which screen to show
const [score, setScore] = useState(0)             // tracks the player's score
```

### Conditional Rendering
Only the relevant screen is shown at any time using `&&`:

```jsx
{screen === 'welcome' && <WelcomeScreen />}
{screen === 'playing' && <GameScreen />}
{screen === 'results' && <ResultsScreen />}
```

### API Fetching
Questions are fetched from the Open Trivia DB using the browser's built-in `fetch`:

```jsx
const fetchQuestions = async () => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`)
  const data = await response.json()
  setQuestions(data.results)
}
```

### useMemo
Used to shuffle answer options once per question without triggering unnecessary re-renders:

```jsx
const answers = useMemo(() => {
  const all = [...question.incorrect_answers, question.correct_answer]
  return all.sort(() => Math.random() - 0.5)
}, [question])
```

### Tailwind CSS (CLI)
Tailwind is installed via CLI (not CDN) which means only the classes actually used in the project are included in the final CSS build. Custom colors, fonts, shadows and animations are defined in `tailwind.config.js`:

```js
colors: {
  neon: {
    cyan: '#00ffff',
    pink: '#ff00ff',
  }
}
```

Then used directly in JSX:
```jsx
<h1 className="font-arcade text-neon-cyan animate-flicker">TRIVIA GAME</h1>
```

---

## 🚀 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOURUSERNAME/trivia-game-sonnet.git

# 2. Move into the project folder
cd trivia-game-sonnet

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser to **http://localhost:5173**

> ⚠️ Note: `node_modules` is not included in the repository. Running `npm install` is required to recreate it from `package.json`.

---

## 🎨 Customization

### Adding More Categories
Open `src/components/CategorySelector.jsx` and add entries to the `categories` array. Category IDs come from the [Open Trivia DB category list](https://opentdb.com/api_category.php).

### Changing the Color Scheme
Open `tailwind.config.js` and update the values under `theme.extend.colors.neon`. The app uses `text-neon-cyan`, `text-neon-pink`, `text-neon-green` and `text-neon-yellow` throughout.

### Changing the Font
The arcade font is loaded from Google Fonts in `index.html`. Replace the `<link>` tag with any other Google Font and update `fontFamily.arcade` in `tailwind.config.js`.

---

## 📚 Learning Resources

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Open Trivia DB API](https://opentdb.com/api_config.php)