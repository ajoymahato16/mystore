import { User } from '../model/user.model';

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public payload: User) {}
}

export class ClearUser {
  static readonly type = '[User] Clear';
}

export class Logout {
  static readonly type = '[User] Logout';
}
