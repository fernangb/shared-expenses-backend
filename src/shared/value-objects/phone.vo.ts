export class Phone {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid phone');

    this._value = value;
  }

  get value() {
    return this._value;
  }

  private validate(value: string) {
    const regexString = '^\d{2}9\d{8}$';
    const regexPhone = new RegExp(regexString);
    return regexPhone.test(value);
  }
}
