export class DomainEvent<T extends object = object> {
  private _timeStamp: Date;
  private _eventName: string;
  private _aggregateId: string;
  private _context: T;

  public constructor(
    aggregateId: string,
    context: T,
    type: string = this.constructor.name
  ) {
    this._aggregateId = aggregateId;
    this._timeStamp = new Date();
    this._eventName = type;
    this._context = context;
  }

  get timestamp(): Date {
    return this._timeStamp;
  }

  get eventName(): string {
    return this._eventName;
  }

  // get context(): Object {
  get context(): object {
    return this._context;
  }
}
