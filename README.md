# Pokemon Deck

This is a next js project that allows the user to search for a pokemon by providing it's name or at least 3 characters found inside it's name.

You can save up to 10 pokemonds to your pokemon deck. When a 11th pokemon is added to the pokemon deck the first pokemon that was inserted will be replaced by the new pokemon.

## How to run using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build you container: `docker build -t pokemon-deck-docker .`.
3. Run your container: `docker run -p 3000:3000 pokemon-deck-docker`.

## How to run using npm 

If you dont have [Docker](https://docs.docker.com/get-docker/) installed on your machine you can
run the project using npm.

1. Install dependencies
```bash
npm install
```

2. Run project
```bash
npm run dev
```
