export declare interface LoginReq {
  username: string;
  password: string;
}

export declare interface LoginRes {
  access: string;
  refresh: string;
}

export declare interface RegisterReq {
  username: string;
  email?: string;
  password: string;
}

export declare interface RegisterRes {
  username: string;
  email: string;
}

export declare interface TokenRefreshReq {
  refresh: string;
}

export declare interface TokenRefreshRes {
  access: string;
  refresh: string;
}

export declare interface GetInfoRes {
  username: string;
  email: string;
}
