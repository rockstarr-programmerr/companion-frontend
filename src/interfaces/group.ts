import { User } from './user'

export declare interface Group {
  id: number;
  name: string;
  members: User[];
}
