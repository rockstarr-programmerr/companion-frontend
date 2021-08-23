import { User } from './user'

export declare interface Group {
  pk: number;
  name: string;
  owner: User;
  members: User[];
}
