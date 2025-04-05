export class Result<T, E extends Error> {
    readonly #value: T | E;
    readonly #isOk: boolean;

    private constructor(value: T | E, isOk: boolean) {
        this.#value = value;
        this.#isOk = isOk;
    }

    isOk(): boolean {
        return this.#isOk;
    }

    getValue(): T {
        if (!this.isOk()) throw new Error('Cannot get value from a failed result.');

        return this.#value as T;
    }

    isFail(): boolean {
        return !this.#isOk;
    }

    getError(): E {
        if (!this.isFail()) throw new Error('Cannot get error from a successful result.');

        return this.#value as E;
    }

    static makeOk<T, E extends Error>(value: T): Result<T, E> {
        return new Result<T, E>(value, true);
    }

    static makeFail<T, E extends Error>(error: E): Result<T, E> {
        return new Result<T, E>(error, false);
    }
}
