import { Tree, TreeProps } from 'antd';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import React, { useCallback, useEffect, useState } from 'react';
import { PermissionView } from '../../types';
import { convertPermissionListToTreeData } from '../../utils/tree.helper';

type Props = {
  data: PermissionView[];
  checkedKeys: React.Key[];
  setCheckedKeys: (checked: React.Key[]) => any;
} & TreeProps;
const defaultProps = {
  checkable: true,
  style: { textAlign: 'left' },
} as Props;

const TreeCheckPermission = ({
  data,
  checkedKeys,
  setCheckedKeys,
  ...rest
}: Props) => {
  const [treeData, setTreeData] = useState(
    convertPermissionListToTreeData(data),
  );

  useEffect(() => {
    setTreeData(convertPermissionListToTreeData(data));
  }, [data]);

  const treeDefaultExpandedKeys = treeData.map(f => f.key);

  const onSelectHandler = React.useCallback(
    (
      selectedKeys: React.Key[],
      info: {
        event: 'select';
        selected: boolean;
        node: EventDataNode;
        selectedNodes: DataNode[];
        nativeEvent: MouseEvent;
      },
    ) => {
      const children: React.Key[] = collectAllDescendantKeys(info.node);
      const childrenArray = Array.from(children);
      const currentKeysArray = Array.from(checkedKeys);
      if (info.selected) {
        let missingKeys = childrenArray.filter(
          f => !currentKeysArray.includes(f),
        );
        setCheckedKeys(missingKeys.concat(checkedKeys));
      } else {
        let newKeys = currentKeysArray.filter(f => !childrenArray.includes(f));
        setCheckedKeys(newKeys);
      }
    },
    [checkedKeys, setCheckedKeys],
  );

  return (
    <>
      {treeData.length > 0 && (
        <Tree
          treeData={treeData}
          {...rest}
          checkable
          onCheck={(
            checked:
              | React.Key[]
              | {
                  checked: React.Key[];
                  halfChecked: React.Key[];
                },
            info,
          ) => {
            if (typeof checked === 'object')
              setCheckedKeys((checked as any).checked);
          }}
          onSelect={onSelectHandler}
          checkedKeys={checkedKeys}
          checkStrictly
          defaultExpandedKeys={treeDefaultExpandedKeys}
        />
      )}
    </>
  );
};

const collectAllDescendantKeys = (node: DataNode) => {
  const keys: React.Key[] = [];
  function visit(node: DataNode) {
    keys.push(node.key);
    if (!node.children?.length) return;
    for (const c of node.children) {
      visit(c);
    }
  }
  visit(node);
  return keys;
};

TreeCheckPermission.defaultProps = defaultProps;
export default TreeCheckPermission;
