import React, { ReactElement } from 'react';
import { Table, Tag, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { GroupListDto, UserListDto } from '../../../types';

interface Props {
  data: GroupListDto[];
  rowClickHandler: (row: GroupListDto) => any;
}
const columns = [
  {
    title: '#',
    dataIndex: 'group_id',
    key: 'group_id',
  },
  {
    title: 'Group Name',
    dataIndex: 'group_name',
    key: 'group_name',
  },
  {
    title: 'Group Description',
    dataIndex: 'group_description',
    key: 'group_description',
  },
  {
    title: 'e-mail',
    dataIndex: 'group_email',
    key: 'group_email',
  },
  {
    title: 'User Count',
    dataIndex: 'user_count',
    key: 'user_count',
  },
  {
    title: 'Role Count',
    dataIndex: 'role_count',
    key: 'role_count',
  },
] as ColumnType<GroupListDto>[];
export default function GroupsList({
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
        rowKey={'group_id'}
      />
    </div>
  );
}
