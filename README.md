Blue Archive Tools
==================

**Blue Archive Tools** is a web application designed to provide fans of Blue Archive with a suite of creative and interactive tools. The app offers an immersive experience with a clean and vibrant design, reflecting the aesthetic of the game. Users can explore various features such as the **Dialog Maker**, **Momotalk**, and **Music** sections, each providing unique and engaging utilities for fans to enjoy😎

* * * * *

🚀 Quick Start
--------------

1.  **Clone the repository.**

    ```bash
    git clone
    ```

2.  **Install dependencies.**

    ```bash
    npm install
    ```

3.  **Start the development server.**

    ```bash
    npm run dev
    ```

4.  **Open the browser and visit `http://localhost:3000`.**

* * * * *

🛠️ Features
------------

-   **Dialog Maker:** Create custom dialogues in the style of Blue Archive, perfect for fan fiction, roleplay, or storytelling.

-   **Momotalk:** Simulate in-game chat scenarios with your favorite characters, adding a layer of interactivity to your creations.

-   **Music:** Access and explore a curated selection of in-game music to enhance your projects or enjoy casually.

* * * * *

🛠️ Tech Stack
--------------

-   **Next.js 15**

-   **React 18**

-   **Turbopack**

-   **Tailwind CSS** 

-   **ShadCN/UI**

-   **Radix UI**

-   **Vitest**

-   **Biome**

* * * * *

📂 Project Structure
--------------------

```
├── app
│   ├── components      # UI components
│   ├── hooks           # Custom hooks
│   ├── lib             # Utility functions
│   ├── styles          # Global CSS
│   ├── tests           # Integration and unit tests
│   ├── layout.tsx      # Root layout
│   ├── pages           # Next.js pages
│   └── page.tsx        # Main page component
├── public              # Static files
├── scripts/hooks       # Git hooks
└── ...
```

* * * * *

🔍 Available Scripts
--------------------

-   `dev`: Start development server with Turbopack

-   `build`: Build the application

-   `start`: Start the production server

-   `lint`: Run Biome linter

-   `format`: Format code using Biome

-   `test`: Run tests with Vitest

* * * * *

🧪 Testing
----------

This project uses **Vitest** and **React Testing Library** for testing. The test setup is configured in `app/tests/vitest.setup.ts`.

Run tests with:

```
npm run test
```

* * * * *

🧹 Code Quality
---------------

Biome is configured for linting and formatting. It is integrated with Git pre-commit hooks to ensure consistent code quality.

```
npm run lint
npm run format
```

* * * * *

⚙️ Configuration
----------------

### Biome

Biome is used for both linting and formatting, configured in `biome.json` and `.vscode/settings.json`.

### Tailwind CSS

Tailwind configuration is defined in `tailwind.config.js` with extended theme settings and dark mode support.

### Testing

Testing environment is set up using `vitest.config.mts`.

* * * * *

🎯 Target Audience
------------------

Blue Archive Tools is ideal for fans of the game, content creators, and anyone interested in exploring creative possibilities within the Blue Archive universe. Whether for fun, content creation, or fan engagement, the app offers tools to bring imagination to life.