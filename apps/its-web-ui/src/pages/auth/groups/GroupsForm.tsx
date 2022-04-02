import { Button, Form, Input, message, notification, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { ReactElement, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getGroupsLookupData,
  getRoleLookupData,
  getUserLookupData,
  QUERY_KEYS,
} from '../../../state';
import {
  GroupEditDto,
  RoleLookupModel,
  UserLookupModel,
} from '../../../types';

type Props = {
  // permission: UserEditDto;
  // saveHandler: (row: UserEditDto) => any;
};

export default function GroupsForm({}: // permission,
// saveHandler,
Props): ReactElement {
  const [form] = Form.useForm();
  const [group, setGroup] = useState({
    group_name: '',
    group_description: '',
    group_email: '',
    roles: [] as Array<RoleLookupModel>,
    users: [] as Array<UserLookupModel>,
  });

  const [userIdsInGroup, setUserIdsInGroup] = useState<string[]>([]);

  const [roleIdsGroupHave, setRoleIdsGroupHave] = useState<string[]>([]);

  const usersLookupData = useQuery(
    QUERY_KEYS.USERS_LOOKUP_DATA,
    getUserLookupData,
  );

  const rolesLookupData = useQuery(
    QUERY_KEYS.ROLES_LOOKUP_DATA,
    getRoleLookupData,
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newGroup: GroupEditDto) => {
      if (newGroup?.group_id > 0) {
        console.log('trying to serialize');
        const { group_id, ...group } = newGroup;
        return axios.patch('/auth/groups/' + group_id.toString(), group);
      } else return axios.post('/auth/groups/', newGroup);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.GROUPS_ALL);
        queryClient.invalidateQueries(QUERY_KEYS.GROUPS_LOOKUP_DATA);
      },
    },
  );

  const onFinish = (values: GroupEditDto) => {
    console.log('Group: ', values);
    const newGroup = Object.assign({}, group, values);
    // get groups
    const userIds = userIdsInGroup.map(f => Number(f));
    newGroup.users =
      usersLookupData.data?.filter(g => userIds.includes(g.user_id)) ?? [];
    // get roles
    const roleIds = roleIdsGroupHave.map(f => Number(f));
    newGroup.roles =
      rolesLookupData.data?.filter(g => roleIds.includes(g.role_id)) ?? [];
    // saveHandler(values);
    mutation
      .mutateAsync(newGroup)
      .then(r => {
        message.success('Changes are saved', 4.5);
        console.log('new Group from db', r);
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

  const handleChangeUsers = (value: string[], option: any) => {
    setUserIdsInGroup(value);
    console.log('change', { value, option });
  };

  const handleChangeRoles = (value: string[], option: any) => {
    setRoleIdsGroupHave(value);
    console.log('change', { value, option });
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '25rem' }}>
      <Title level={2}>Group Definition</Title>
      <Form
        layout="vertical"
        form={form}
        name="group-edit-form"
        onFinish={onFinish}
        initialValues={group}
        size="small"
      >
        <Form.Item
          name="group_name"
          label="Group Name"
          rules={[
            { required: true, message: 'This group needs a unique name!' },
          ]}
        >
          <Input placeholder="Group Name" />
        </Form.Item>

        <Form.Item
          name="group_description"
          label="Group Description"
          rules={[
            {
              required: true,
              message: 'This group should have a description right!',
            },
          ]}
        >
          <Input placeholder="Group Description" />
        </Form.Item>

        <Form.Item
          name="group_email"
          label="e-mail"
          rules={[
            {
              required: true,
              message: 'This group should have a working email!',
            },
            {
              type: 'email',
              message: 'Make sure this is a valid email address',
            },
          ]}
        >
          <Input placeholder="e-mail" type={'email'} />
        </Form.Item>

        <Form.Item name="users" label="Users">
          <Select
            id="users"
            mode="multiple"
            value={userIdsInGroup}
            allowClear
            style={{ width: '100%' }}
            placeholder="Users in Group"
            onChange={handleChangeUsers}
          >
            {usersLookupData.data?.map(g => (
              <Select.Option key={g.user_id}>{g.user_name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="roles" label="Roles">
          <Select
            id="roles"
            mode="multiple"
            value={roleIdsGroupHave}
            allowClear
            style={{ width: '100%' }}
            placeholder="Roles Group Have"
            onChange={handleChangeRoles}
          >
            {rolesLookupData.data?.map(g => (
              <Select.Option key={g.role_id}>
                <span title={g.role_description}>{g.role_name}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button">
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
