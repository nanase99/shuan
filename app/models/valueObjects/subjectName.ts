import { AbstractValueObject } from "./abstractValueObject";

export class SubjectName extends AbstractValueObject<string, "SubjectName"> {
  protected validate(subjectName: string): void {
    // TODO: バリデーションロジックを描く
  }
}
