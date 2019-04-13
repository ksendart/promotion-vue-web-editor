import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  public uid: number;
  public displayName: string;

  public get name(): string {
    return this.displayName;
  }
}
