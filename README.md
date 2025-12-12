# Wave of Death - Project Setup Instructions

Welcome! This guide will help you get the **Wave of Death** web game running on your machine.

---

## 1. Install Live Server Globally

The project uses **Live Server** to serve the game in your browser. You need to install it globally first:

```bash
npm install -g live-server
```

If you want to check whether it’s already installed:

```bash
npm list -g live-server
```

* If installed, you’ll see the version number.
* If not, install it using the command above.

---

## 2. Install Project Dependencies

After cloning or downloading the project, navigate to the project root in your terminal and run:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including TypeScript.

---

## 3. Running the Project

There are two ways to start the game:

### Option 1: Quick Start (Default `npm start`)

```bash
npm start
```

* This will automatically start:

  1. **TypeScript watch mode** (`tsc --watch`)
  2. **Live Server**

⚠️ Note: This opens **two separate command prompt windows** on Windows, which might be visually messy.

---

### Option 2: Recommended for Visual Studio Code

For a cleaner setup, you can run the processes in separate terminals inside VS Code:

1. **Terminal 1** – TypeScript Watch:

```bash
npm run watch
```

* Watches your `.ts` files in `src/`
* Compiles them automatically to `dist/` on save

2. **Terminal 2** – Live Server:

```bash
npm run serve
```

* Launches the project in your default browser
* Auto-refreshes when JavaScript files in `dist/` change

✅ This setup keeps everything in VS Code terminals and looks much cleaner.

---

## 4. Project Structure

```
wave-of-death/
├─ index.html        # Entry point
├─ style.css
├─ package.json
├─ tsconfig.json
├─ src/
│   ├─ main.ts       # Entry point for TypeScript
├─ dist/
│   ├─ main.js       # Compiled JS from main.ts
```

---

## 5. Important Notes

* Always edit `.ts` files in `src/`. Changes will be compiled automatically if `npm run watch` is running.
* Open `index.html` in the browser via Live Server, **not directly by double-clicking**, to enable module imports.
* Make sure your `<script>` in `index.html` includes `type="module"`:

```html
<script type="module" src="dist/main.js"></script>
```

---

You’re now ready to start developing and running **Wave of Death**! 🚀
