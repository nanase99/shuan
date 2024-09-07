export class Progress {
  private readonly _value: number;

  constructor(value: number) {
    this.validate(value);
    this._value = value;
  }

  private validate(progress: number): void {
    // TODO: バリデーションロジックを描く
  }
}
