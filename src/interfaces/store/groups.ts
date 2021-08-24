import { Group } from '../group'

export declare type GroupWithState = Group & {
  editing: boolean,
  loading: boolean,
  nameErrs: string[]
}

export declare interface GroupsState {
  groups: GroupWithState[];
  currentGroup?: GroupWithState;
}
