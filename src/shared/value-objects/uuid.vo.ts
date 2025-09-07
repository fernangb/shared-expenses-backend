import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class UUID {
  private _value: string;

  constructor(value?: string) {
    this._value = value ? value : uuidv4();

    this.validate();
  }

  get value() {
    return this._value;
  }

  private validate() {
    const isValidUUID = uuidValidate(this.value);

    if (!isValidUUID) throw new Error('Invalid UUID');
  }
}
