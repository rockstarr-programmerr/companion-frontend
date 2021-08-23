declare interface _User {
  pk: number;
  username: string;
  email: string;
}

export declare interface GroupDetailRes {
  pk: number;
  name: string;
  owner: _User;
  members: _User[];
  create_time: string;
}

export declare type GroupListRes = GroupDetailRes[]

export declare interface GroupCreateReq {
  name: string;
}

export declare type GroupCreateRes = GroupDetailRes
