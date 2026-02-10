# Godly Powers - Planet Shaper

A React + Vite game where you play as a god shaping a planet.

## Setup & Running

This project is designed to run in Docker.

1.  Navigate to this directory:
    ```bash
    cd lib/ComboBox
    ```

2.  Build and start the container:
    ```bash
    docker compose up -d --build
    ```

3.  Open the game in your browser: [http://localhost:5174](http://localhost:5174)

## Development

-   The `src` folder is mounted into the container, so edits you make locally will reflect immediately (Hot Module Replacement).
-   If you add new dependencies to `package.json`, you will need to rebuild the container: `docker compose up -d --build`.

## Features

-   **Drag & Drop Workbench**: Combine elements to create new ones.
-   **Mock AI Integration**: Simulates Llama AI responses for element combinations.
-   **Dynamic UI**: Sleek pastel interface.
