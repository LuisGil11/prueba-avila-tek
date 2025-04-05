export class DomainEvent<T extends object = object> {
  private _timeStamp: Date;
  private _eventName: string;
  private _aggregateId: string;
  private _context: T;
  private _version: number;

  public constructor(
    aggregateId: string,
    context: T,
    version: number,
    type: string = this.constructor.name
  ) {
    this._aggregateId = aggregateId;
    this._timeStamp = new Date();
    this._eventName = type;
    this._context = context;
    this._version = version;
  }

  get timestamp(): Date {
    return this._timeStamp;
  }

  get eventName(): string {
    return this._eventName;
  }

  get version(): number {
    return this._version;
  }

  get context(): object {
    return this._context;
  }
}
