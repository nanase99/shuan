export abstract class AbstractValueObject<T, U> {
  // NOTE:
  // TypeScriptでは異なるクラス（型）であっても
  // プロパティやメソッドが同じ構造であればコンパイルエラーを起こさない。
  // 上記を防ぐために識別用の_typeプロパティを用意する。
  // @ts-expect-error
  private _type: U;

  protected readonly _value: T;

  constructor(value: T) {
    this.validate(value);
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  public equals(other: AbstractValueObject<T, U>): boolean {
    return this._value === other._value;
  }

  protected abstract validate(value: T): void;
}
