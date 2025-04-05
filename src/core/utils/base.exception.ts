export abstract class BaseException extends Error {
  constructor(message: string, code: string, cause?: BaseException) {
    super(message);
    this._message = message;
    this._code = code;
    this._cause = cause;
  }

  protected readonly _message: string;
  protected readonly _code: string;
  protected readonly _cause?: BaseException;

  get trace(): string {
    return this.message + (this._cause ? `: ${this._cause.trace}` : "");
  }

  get code(): string {
    return this._code;
  }

  get message(): string {
    return this._message;
  }
}
