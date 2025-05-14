# Brighter Map

**Brighter Map** is a web application that allows users to explore, search, and filter information displayed on the game map from the massively multiplayer online role-playing game (MMO) _Brighter Shores_. Built with modern web technologies, it provides an interactive and intuitive way to access game data.

Try the [Live Demo](https://jrbarnhart.github.io/brighter-map/)

## Technologies Used

This project is built using the following key technologies:

- **[Vite](https://vitejs.dev/)**: A next-generation frontend tooling that provides an extremely fast development experience.
- **[TypeScript](https://www.typescriptlang.org/)**: A statically typed superset of JavaScript that enhances code maintainability and developer productivity.
- **[React](https://react.dev/)**: A popular JavaScript library for building user interfaces or UI components.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)**: A React renderer for Three.js, enabling the creation of interactive 3D graphics in the browser.
- **[TanStack Query (React Query)](https://tanstack.com/query/latest)**: A powerful asynchronous state management library for fetching, caching, synchronizing and updating data in React applications.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.

## Features

- **Interactive Map Exploration**: Browse the Brighter Shores game world with pan and zoom capabilities.
- **Search Functionality**: Quickly find specific locations, NPCs, items, or other data points on the map.
- **Filtering Options**: Filter displayed information based on various categories (e.g., quest givers, resource nodes, points of interest).
- **Data Integration**: Fetches game data from the [Brighter API](https://brshapi.com).
- **Responsive Design**: Provides a seamless experience across different devices and screen sizes.
- **2D Map Representation**: Leverages React Three Fiber for performant, component-based rendering of the map.

## Getting Started

To run Brighter Map locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/jrbarnhart/brighter-map.git
    cd brighter-map
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    This will start the Vite development server, and you can usually access the application at `http://localhost:5173` (or a similar address displayed in your terminal).

## Usage

Once the application is running, you can:

- **Pan and Zoom:** Use your mouse or touch gestures to navigate the Brighter Shores map.
- **Search:** Enter keywords into the search bar to find specific things on the map.
- **Filter:** Use the provided filter options to display only the types of information you are interested in.
- **Interact:** Click on rooms to view detailed information fetched from the Brighter API.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
