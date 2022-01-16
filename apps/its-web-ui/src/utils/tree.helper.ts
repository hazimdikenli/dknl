import { PermissionView } from '../types';

export interface INodeType {
  id: string;
  title: string;
  value: string;
  // key: string; same as value
  children?: INodeType[];
}
export const convertPermissionListToTreeData = (data: PermissionView[]) => {
  const listToNode = (row: PermissionView) => {
    const node = {
      title: row.permission_description,
      value: row.permission_name.toString(),
      // key: row.permission_id.toString(),
      id: row.permission_id.toString(),
    } as INodeType;
    const children = data.filter((f) => f.parent_id === row.permission_id);
    node.children = children.map((c) => listToNode(c));
    return node;
  };

  const roots = data.filter((f) => !f.parent_id);
  const treeData = roots.map((r) => listToNode(r));
  return treeData;
};