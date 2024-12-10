/**
 * Error thrown when a game is not found
 */
export class NoGameFoundError extends Error {

}

/**
 * Error thrown when a game is full, ie 2 people (a host and guest is present in a game instance)
 */
export class GameFullError extends Error {

}

/**
 * Error thrown when a game already exists
 */
export class GameAlreadyExistsError extends Error {

}