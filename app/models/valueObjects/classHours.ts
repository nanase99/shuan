import { AbstractValueObject } from "./abstractValueObject";

export class ClassHours extends AbstractValueObject<number, "ClassHours"> {
  protected override validate(classHours: number): void {
    // TODO: バリデーションロジックを描く
  }
}
