import { Form, Input, Button, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getGroupsLookupData, getUserLookupData, QUERY_KEYS } from '../../../state';
import { PermissionView, RoleEditDto, RoleListDto } from '../../../types';
import TreeSelectPermission from '../../components/TreeSelectPermission';

type Props = {};

export default function NewRole({}: Props) {
  const [form] = Form.useForm();
  const role = useState({ role_name: '', role_description: '' });
  const userLookupData = useQuery(
    QUERY_KEYS.USERS_LOOKUP_DATA,
    getUserLookupData,
  );
  const groupsLookupData = useQuery(
    QUERY_KEYS.GROUPS_LOOKUP_DATA,
    getGroupsLookupData,
  );

  const onFinish = (values: RoleEditDto) => {
    console.log(values);
    // saveHandler(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const userOptions = userLookupData.data?.map(u => (
    <Select.Option key={u.user_id.toString()}>{u.full_name}</Select.Option>
  ));

  const handleChangeUsers = (value: any, option: any) => {
    console.log('change', { value, option });
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '25rem' }}>
      <Title level={3}>Create New Role</Title>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={role}
      >
        <Form.Item
          name="role_name"
          label="Role Name"
          rules={[{ required: true, message: 'This role needs a name!' }]}
        >
          <Input placeholder="Role Name" />
        </Form.Item>

        <Form.Item
          name="role_description"
          label="Role Description"
          rules={[
            {
              required: true,
              message: 'This role needs some descriptive text!',
            },
          ]}
        >
          <Input placeholder="Role Description" />
        </Form.Item>

        <Form.Item>
          <Select
            id='users'
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Users in Role"
            onChange={handleChangeUsers}
          >
            {userOptions}
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            id='groups'
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Groups in Role"
            onChange={handleChangeUsers}
          >
            {groupsLookupData.data?.map(g=> 
            <Select.Option key={g.group_id}>{g.group_name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
