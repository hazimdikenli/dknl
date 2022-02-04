import axios from 'axios';
import { GroupLookupModel, RoleListDto, User, UserLookupModel } from './types';

export enum QUERY_KEYS {
  PERMISSIONS_ALL = 'permissions_all',
  ROLES_ALL = 'roles_all',
  USERS_ALL = 'users_all',
  USERS_LOOKUP_DATA = 'users_lookup_data',
  GROUPS_ALL = 'groups_all',
  GROUPS_LOOKUP_DATA = 'groups_lookup_data'

}

const getRoleList = async () => {
  const result = await axios.get<RoleListDto[]>('/auth/roles/');
  return result.data;
};

const getUserLookupData = async () => {
  const result = await axios.get<UserLookupModel[]>('/auth/users/lookup');
  return result.data;
};

const getGroupsLookupData = async () => {
  const result = await axios.get<GroupLookupModel[]>('/auth/groups/lookup');
  return result.data;
};
export {getRoleList, getUserLookupData, getGroupsLookupData};