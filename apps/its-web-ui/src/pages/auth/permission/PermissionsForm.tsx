import { Button, Form, Input, Radio, RadioChangeEvent } from 'antd';
import { FormLayout } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import React, { ReactElement } from 'react';
import { PermissionView } from '../../../types';
import TreeSelectPermission from '../../components/TreeSelectPermission';

type Props = {
  data: PermissionView[];
  permission: PermissionView;
  saveHandler: (row: PermissionView) => any;
};

export default function PermissionsForm({
  data,
  permission,
  saveHandler,
}: Props): ReactElement {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = React.useState<FormLayout>('vertical');

  const layout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 16,
          },
        }
      : null;
  const tailLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            offset: 8,
            span: 16,
          },
        }
      : null;
  const onFormLayoutChange = (e: RadioChangeEvent) => {
    // console.log(e);
    setFormLayout(e.target.value);
  };
  const onFinish = (values: PermissionView) => {
    const parent = data.find(
      (f) => f.permission_name === values.parent_permission_name
    );
    if (parent) values.parent_id = parent.permission_id;
    else values.parent_id = undefined;
    console.log(values);
    saveHandler(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '25rem' }}>
      <Title level={2}>Permission Definition</Title>
      <Form
        {...layout}
        layout={formLayout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={permission}
      >
        <Form.Item
          name="permission_name"
          label="Permission Name"
          rules={[{ required: true, message: 'This permission needs a name!' }]}
        >
          <Input placeholder="Permission Name" />
        </Form.Item>

        <Form.Item
          name="permission_description"
          label="Permission Description"
          rules={[
            {
              required: true,
              message: 'This permission needs some descriptive text!',
            },
          ]}
        >
          <Input placeholder="Permission Description" />
        </Form.Item>

        <Form.Item name="parent_permission_name" label="Parent Permission Name">
          <TreeSelectPermission
            data={data}
            // onChange={(value: any) => {
            //   form.setFieldsValue({parent_permission_name: value});
            // }}
          />
        </Form.Item>

        {/* <Form.Item label="Form Layout" name="layout">
          <Radio.Group
            value={formLayout}
            onChange={(e: RadioChangeEvent) => onFormLayoutChange(e)}
          >
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item {...tailLayout}>
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
