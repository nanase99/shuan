export class ClassHours {
  private readonly _value: number;

  constructor(value: number) {
    this.validate(value);
    this._value = value;
  }

  private validate(classHours: number): void {
    // TODO: バリデーションロジックを描く
  }
}
