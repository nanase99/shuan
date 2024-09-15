import { AbstractSubject, SubjectTag } from "./abstractSubject";

export class CompletedSubject extends AbstractSubject {
  public override readonly type = SubjectTag.Completed;
}
