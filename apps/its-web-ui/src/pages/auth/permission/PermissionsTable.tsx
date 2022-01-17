import React, { ReactElement } from 'react';
import { Table, Tag, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { PermissionView } from '../../../types';

interface Props {
  data: PermissionView[];
  rowClickHandler: (row: PermissionView) => any;
}
const columns = [
  {
    title: '#',
    dataIndex: 'permission_id',
    key: 'permission_id',
  },
  {
    title: 'Permission Name',
    dataIndex: 'permission_name',
    key: 'permission_name',
  },
  {
    title: 'Description',
    dataIndex: 'permission_description',
    key: 'permission_description',
  },
  {
    title: 'Child Count',
    dataIndex: 'child_count',
    key: 'child_count',
  },
  {
    title: 'Parent Name',
    dataIndex: 'parent_permission_name',
    key: 'parent_permission_name',
  },
  {
    title: 'Parent Description',
    dataIndex: 'parent_permission_description',
    key: 'parent_permission_description',
  },
] as ColumnType<PermissionView>[];
export default function PermissionsTable({
  data,
  rowClickHandler,
}: Props): ReactElement {
  return (
    <div>
      <Table
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              console.log(event);
              rowClickHandler(record);
            }, // click row
            onDoubleClick: event => {
              console.log(event);
              // rowClickHandler(record);
            }, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        size="small"
        dataSource={data}
        rowKey={'permission_id'}
      />
    </div>
  );
}
