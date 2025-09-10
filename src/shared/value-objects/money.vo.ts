export class Money {
  private _value: number;

  constructor(value: number) {
    if (!this.validate(value)) throw new Error('Invalid money value');

    this._value = value;
  }

  get value() {
    return this._value;
  }

  private validate(value: number) {
    const moneyRegex = /^\d+(\.\d{1,2})?$/;

    return moneyRegex.test(`${value}`);
  }
}
