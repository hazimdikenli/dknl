import React, { ReactElement } from 'react';
import { Table, Tag, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { RoleListDto } from '../../../types';

interface Props {
  data: RoleListDto[];
  rowClickHandler: (row: RoleListDto) => any;
}
const columns = [
  {
    title: '#',
    dataIndex: 'role_id',
    key: 'role_id',
  },
  {
    title: 'Role Name',
    dataIndex: 'role_name',
    key: 'role_name',
  },
  {
    title: 'Description',
    dataIndex: 'role_description',
    key: 'role_description',
  },
  {
    title: 'User Count',
    dataIndex: 'user_count',
    key: 'user_count',
  },
  {
    title: 'Group Count',
    dataIndex: 'group_count',
    key: 'group_count',
  },
] as ColumnType<RoleListDto>[];
export default function RolesList({
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
        rowKey={'role_id'}
      />
    </div>
  );
}
