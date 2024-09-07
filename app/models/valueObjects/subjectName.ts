export class SubjectName {
  private readonly _value: string;

  constructor(value: string) {
    this.validate(value);
    this._value = value;
  }

  private validate(subjectName: string): void {
    // TODO: バリデーションロジックを描く
  }
}
