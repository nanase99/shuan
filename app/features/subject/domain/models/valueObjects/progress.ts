import { AbstractValueObject } from "./abstractValueObject";

export class Progress extends AbstractValueObject<number, "Progress"> {
  protected validate(progress: number): void {
    // TODO: バリデーションロジックを描く
  }
}
