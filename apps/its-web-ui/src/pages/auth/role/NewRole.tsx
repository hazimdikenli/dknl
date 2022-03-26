import { Button, Form, Input, message, notification, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getGroupsLookupData,
  getPermissions,
  getUserLookupData,
  QUERY_KEYS
} from '../../../state';
import {
  GroupLookupModel, RoleEditDto, UserLookupModel
} from '../../../types';
import TreeCheckPermission from '../../components/TreeCheckPermission';

type Props = {};

export default function NewRole({}: Props) {
  const [form] = Form.useForm();
  const [role, setRole] = useState({
    role_name: '',
    role_description: '',
    users: [] as Array<UserLookupModel>,
    groups: [] as Array<GroupLookupModel>,
  });
  const [userIdsInRole, setUserIdsInRole] = useState<string[]>([]);
  const [groupIdsInRole, setGroupIdsInRole] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['15']);

  const userLookupData = useQuery(
    QUERY_KEYS.USERS_LOOKUP_DATA,
    getUserLookupData,
  );
  const groupsLookupData = useQuery(
    QUERY_KEYS.GROUPS_LOOKUP_DATA,
    getGroupsLookupData,
  );
  const permissionData = useQuery(QUERY_KEYS.PERMISSIONS_ALL, getPermissions);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newRole: RoleEditDto) => {
      if (newRole?.role_id > 0) {
        console.log('trying to serialize');
        const { role_id, ...perm } = newRole;
        return axios.patch('/auth/roles/' + role_id.toString(), perm);
      } else return axios.post('/auth/roles/', newRole);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.ROLES_ALL);
        queryClient.invalidateQueries(QUERY_KEYS.ROLES_LOOKUP_DATA);
      },
    },
  );

  const onFinish = (values: RoleEditDto) => {
    console.log('Role:', role);
    console.log(values);
    setRole(r => {
      return Object.assign({}, r, values);
    });
    const newRole = { ...values };
    const userIds = userIdsInRole.map(f => Number(f));
    newRole.users =
      userLookupData.data?.filter(u => userIds.includes(u.user_id)) ?? [];
    const groupIds = groupIdsInRole.map(f => Number(f));
    newRole.groups =
      groupsLookupData.data?.filter(g => groupIds.includes(g.group_id)) ?? [];
    newRole.permissions =
      checkedKeys.map(p => {
        return {
          permission_id: Number(p),
        };
      }) ?? [];
    // saveHandler(values);
    mutation
      .mutateAsync(newRole)
      .then(r => {
        message.success('Changes are saved', 4.5);
        console.log('new Role from db', r);
      })
      .catch(reason => {
        notification['error']({
          message: 'Error saving changes',
          description: reason.message,
          duration: 0,
        });
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const userOptions = userLookupData.data?.map(u => (
    <Select.Option key={u.user_id.toString()}>{u.full_name}</Select.Option>
  ));

  const handleChangeUsers = (value: string[], option: any) => {
    setUserIdsInRole(value);
    console.log('change', { value, option });
  };
  const handleChangeGroups = (value: string[], option: any) => {
    setGroupIdsInRole(value);
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
            id="users"
            mode="multiple"
            value={userIdsInRole}
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
            id="groups"
            mode="multiple"
            value={groupIdsInRole}
            allowClear
            style={{ width: '100%' }}
            placeholder="Groups in Role"
            onChange={handleChangeGroups}
          >
            {groupsLookupData.data?.map(g => (
              <Select.Option key={g.group_id}>{g.group_name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <TreeCheckPermission
            data={permissionData?.data || []}
            checkedKeys={checkedKeys}
            setCheckedKeys={setCheckedKeys}
          />
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
