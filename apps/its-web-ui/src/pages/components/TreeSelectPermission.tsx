import { TreeSelect, TreeSelectProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { PermissionView } from '../../types';
import { convertPermissionListToTreeData } from '../../utils/tree.helper';

type Props = {
  data: PermissionView[];
} & TreeSelectProps;
const defaultProps = {
  showSearch: true,
  allowClear: true,
  placeholder: 'Please select',
  style: { textAlign: 'left' },
  dropdownStyle: { maxHeight: 400, overflow: 'auto' },
} as Props;

const TreeSelectPermission = ({ data, ...rest }: Props) => {
  const [treeData, setTreeData] = useState(
    convertPermissionListToTreeData(data),
  );
  // const [value, setValue] = useState(undefined);
  const onChange = () => {
    console.log();
    // setValue(value);
  };
  useEffect(() => {
    setTreeData(convertPermissionListToTreeData(data));
  }, [data]);
  const treeDefaultExpandedKeys = [];
  if (treeData.length) treeDefaultExpandedKeys.push(treeData[0].value);

  return (
    <TreeSelect
      treeData={treeData}
      {...rest}
      treeDefaultExpandedKeys={treeDefaultExpandedKeys}
      onChange={(value: any, labelList: React.ReactNode[], extra: any) => {
        console.log('onChange:', { value, labelList, extra });
        rest.onChange && rest.onChange(value, labelList, extra);
      }}
    />
  );
};
TreeSelectPermission.defaultProps = defaultProps;
export default TreeSelectPermission;
