<br /><br />

<p align="center">
<a href="https://devleague.io">
  <img src="https://devleague.io/logo.png" alt="DevLeague Logo" width="70">
</a>
</p>
<h1 align="center"><b>DevLeague</b></h1>
<p align="center"><b>Your Github profile as a Pokemon card</b></p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/96ccbc1c-54ae-42f5-aeed-db20f88bf57a/deploy-status)](https://app.netlify.com/sites/devleagueio/deploys)

Welcome to the frontend repository of [DevLeague.io](https://devleague.io), built using [Svelte](https://svelte.dev/), a modern UI framework that compiles components into highly efficient JavaScript at build time.



## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project serves as the frontend for DevLeague.io.

## Getting Started

To set up the project locally, follow the steps below.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ssaini4/devleague-client.git
   cd devleague-client
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
```

By default, the application will be accessible at `http://localhost:5173`. You can change the port by modifying the `--port` flag in the `package.json` scripts.

## Building for Production

To build the application for production:

```bash
npm run build
```

The optimized output will be in the `.svelte-kit/` directory.

## Contributing

We welcome contributions! Please create a new issue with your idea or feature request.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.
