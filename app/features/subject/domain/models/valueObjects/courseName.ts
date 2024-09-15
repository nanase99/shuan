import { AbstractValueObject } from "./abstractValueObject";

export class CourseName extends AbstractValueObject<string, "CourseName"> {
  protected override validate(courseName: string): void {
    // TODO: バリデーションロジックを描く
  }
}
