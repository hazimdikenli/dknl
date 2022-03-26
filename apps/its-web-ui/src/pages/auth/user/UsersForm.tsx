import { Button, Form, Input, message, notification, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { ReactElement, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getGroupsLookupData,
  getRoleLookupData,
  QUERY_KEYS,
} from '../../../state';
import { GroupLookupModel, RoleLookupModel, UserEditDto } from '../../../types';

type Props = {
  // permission: UserEditDto;
  // saveHandler: (row: UserEditDto) => any;
};

export default function UsersForm({}: // permission,
// saveHandler,
Props): ReactElement {
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    user_name: '',
    full_name: '',
    user_email: '',
    roles: [] as Array<RoleLookupModel>,
    groups: [] as Array<GroupLookupModel>,
  });

  const [groupIdsUserBelongTo, setGroupIdsUserBelongTo] = useState<string[]>(
    [],
  );

  const [roleIdsUserHave, setRoleIdsUserHave] = useState<string[]>([]);

  const groupsLookupData = useQuery(
    QUERY_KEYS.GROUPS_LOOKUP_DATA,
    getGroupsLookupData,
  );

  const rolesLookupData = useQuery(
    QUERY_KEYS.ROLES_LOOKUP_DATA,
    getRoleLookupData,
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newUser: UserEditDto) => {
      if (newUser?.user_id > 0) {
        console.log('trying to serialize');
        const { user_id, ...user } = newUser;
        return axios.patch('/auth/users/' + user_id.toString(), user);
      } else return axios.post('/auth/users/', newUser);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.USERS_ALL);
        queryClient.invalidateQueries(QUERY_KEYS.USERS_LOOKUP_DATA);
      },
    },
  );


  const onFinish = (values: UserEditDto) => {
    console.log('User: ', values);
    const newUser = Object.assign({}, user, {password:''},values);
    // get groups
    const groupIds = groupIdsUserBelongTo.map(f => Number(f));
    newUser.groups =
      groupsLookupData.data?.filter(g => groupIds.includes(g.group_id)) ?? [];
    // get roles
    const roleIds = roleIdsUserHave.map(f => Number(f));
    newUser.roles =
      rolesLookupData.data?.filter(g => roleIds.includes(g.role_id)) ?? [];
    // saveHandler(values);
    mutation
    .mutateAsync(newUser)
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

  const handleChangeGroups = (value: string[], option: any) => {
    setGroupIdsUserBelongTo(value);
    console.log('change', { value, option });
  };

  const handleChangeRoles = (value: string[], option: any) => {
    setRoleIdsUserHave(value);
    console.log('change', { value, option });
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '25rem' }}>
      <Title level={2}>User Definition</Title>
      <Form
        layout="vertical"
        form={form}
        name="user-edit-form"
        onFinish={onFinish}
        initialValues={user}
        size="small"
      >
        <Form.Item
          name="user_name"
          label="User Name"
          rules={[
            { required: true, message: 'This user needs a unique name!' },
          ]}
        >
          <Input placeholder="User Name" />
        </Form.Item>

        <Form.Item
          name="full_name"
          label="Full Name"
          rules={[
            {
              required: true,
              message: 'This user should have a name right!',
            },
          ]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="user_email"
          label="e-mail"
          rules={[
            {
              required: true,
              message: 'This user should have a working email!',
            },
            {
              type: 'email',
              message: 'Make sure this is a valid email address',
            },
          ]}
        >
          <Input placeholder="e-mail" type={'email'} />
        </Form.Item>

        <Form.Item name="groups" label="Groups">
          <Select
            id="groups"
            mode="multiple"
            value={groupIdsUserBelongTo}
            allowClear
            style={{ width: '100%' }}
            placeholder="Groups User Belong To"
            onChange={handleChangeGroups}
          >
            {groupsLookupData.data?.map(g => (
              <Select.Option key={g.group_id}>{g.group_name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="roles" label="Roles">
          <Select
            id="roles"
            mode="multiple"
            value={roleIdsUserHave}
            allowClear
            style={{ width: '100%' }}
            placeholder="Roles User Have"
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
