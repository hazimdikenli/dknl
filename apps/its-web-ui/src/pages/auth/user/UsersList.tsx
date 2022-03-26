import React, { ReactElement } from 'react';
import { Table, Tag, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { UserListDto } from '../../../types';

interface Props {
  data: UserListDto[];
  rowClickHandler: (row: UserListDto) => any;
}
const columns = [
  {
    title: '#',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'User Name',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'e-mail',
    dataIndex: 'user_email',
    key: 'user_email',
  },
  {
    title: 'Group Count',
    dataIndex: 'group_count',
    key: 'group_count',
  },
  {
    title: 'Role Count',
    dataIndex: 'role_count',
    key: 'role_count',
  },
] as ColumnType<UserListDto>[];
export default function UsersList({
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
        rowKey={'user_id'}
      />
    </div>
  );
}
