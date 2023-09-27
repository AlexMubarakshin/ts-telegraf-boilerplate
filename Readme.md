# ts-telegraf-boilerplate

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

A personal TypeScript-based boilerplate for Telegram bot development using Telegraf.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)

## Installation

To get started with this boilerplate, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/AlexMubarakshin/ts-telegraf-boilerplate.git
   ```

2. Install dependencies

   ```bash
   cd ts-telegraf-boilerplate
   yarn install
   ```

3. Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

4. Build the project using TypeScript:

    ```bash
    yarn build
    ```

5. Start your Telegram bot:

    ```bash
    yarn start
    ```

    If you want to run your bot in inspect mode for debugging:

    ```bash
    yarn start:inspect
    ```

## Usage

1. **Bot Customization**: Customize your Telegram bot by modifying the code in the `src` directory. You can add new command handlers, event listeners, and any other functionality to suit your bot's purpose.

2. **Environment Configuration**: : Before running your bot, make sure to set your environment variables. Create a `.env` file in the project root based on the provided `.env.example` template. Add your Telegram Bot Token and any other necessary configuration values.

    To add new required fields:

    - Open `.env.example` and add them with meaningful names and placeholders.
    - Ensure that your `.env` file includes values for the new field(s).
    - Update the `initConfig` function to include the new field(s) in the configuration.
    - If you add new required fields, make sure to include them in the `requiredEnvsNames` array in your code to enforce their presence:

        ```bash
        const requiredEnvsNames = ['BOT_TOKEN', 'NEW_ENV_FIELD'] as const;
        ```

## Scripts

- `build`: Build the project using TypeScript.
- `eslint:lint`: Run ESLint to check for code linting issues.
- `eslint:fix`: Run ESLint to automatically fix code linting issues.
- `lint`: Run Prettier, ESLint, and TypeScript type-checking.
- `prettier:check`: Check code formatting with Prettier.
- `prettier:fix`: Format code using Prettier.
- `start`: Start your Telegram bot.
- `start:inspect`: Start your bot with inspect mode.
- `type`-check: Type-check the TypeScript code.
- `test`: Run Jest tests.
