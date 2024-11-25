
type Success<T> = { success: true; data: T };
type Failure<E> = { success: false; error: E };
/**
 * A ErrorHandling type that can be either a Success or a Failure.
 */
export type Result<T, E> = Success<T> | Failure<E>;
/**
 * A Promise that resolves to a ErrorHandling.
 */
export type ResultPromise<T, E> = Promise<Result<T, E>>;

/**
 * Create a successful ErrorHandling.
 * @param data
 */
export function success<T, E>(data: T): Result<T, E> {
    return { success: true, data };
}

/**
 * Create a failed ErrorHandling.
 * @param error
 */
export function error<T, E>(error: E): Result<T, E> {
    return { success: false, error };
}

/**
 * Check if a ErrorHandling is a Success.
 * @param result
 */
export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
    return result.success;
}

/**
 * Check if a ErrorHandling is a Failure.
 * @param result
 */
export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
    return !result.success;
}