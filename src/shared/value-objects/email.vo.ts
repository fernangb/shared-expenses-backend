export class Email {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid email');

    this._value = value;
  }

  get value() {
    return this._value;
  }

  private validate(value: string) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(value);
  }
}
