export class CourseName {
  private readonly _value: string;

  constructor(value: string) {
    this.validate(value);
    this._value = value;
  }

  private validate(courseName: string): void {
    // TODO: バリデーションロジックを描く
  }
}
