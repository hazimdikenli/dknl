import { Button, Col, message, Modal, notification, Row } from 'antd';
import Grid from 'antd/lib/card/Grid';
import axios from 'axios';
import React, { ReactElement, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPermissions, QUERY_KEYS } from '../../../state';
import { PermissionView } from '../../../types';
import PermissionsForm from './PermissionsForm';
import PermissionsTable from './PermissionsTable';


interface Props {}
const newPermission = {
  permission_id: -1,
  permission_name: '',
  permission_description: '',
  parent_permission_name: '',
} as PermissionView;

export default function PermissionsPage({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const permissionQuery = useQuery(QUERY_KEYS.PERMISSIONS_ALL, getPermissions);
  const mutation = useMutation(
    (newPerm: PermissionView) => {
      if (newPerm?.permission_id > 0) {
        console.log('trying to serialize');
        const { permission_id, ...perm } = newPerm;
        return axios.patch(
          '/auth/permissions/' + permission_id.toString(),
          perm,
        );
      } else return axios.post('/auth/permissions/', newPerm);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.PERMISSIONS_ALL);
      },
    },
  );
  const [currentRow, setCurrentRow] = useState<PermissionView | undefined>(
    undefined,
  );
  const [newRow, setNewRow] = useState<PermissionView>(newPermission);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const rowClickHandler = (row: PermissionView) => {
    console.log('Click: ', row);
    setCurrentRow(row);
  };
  const saveRowHandler = (row: PermissionView) => {
    console.log('Save: ', row);
    row.permission_id = currentRow!.permission_id;
    mutation
      .mutateAsync(row)
      .then(r => {
        // queryClient.invalidateQueries(QUERY_KEYS.PERMISSIONS_ALL);
        message.success('Changes are saved', 4.5);
      })
      .catch(reason => {
        notification['error']({
          message: 'Error saving changes',
          description: reason.message,
          duration: 0,
        });
      });
  };
  const saveNewRowHandler = (row: PermissionView) => {
    setNewRow(row);
    console.log('Save: ', row);
    mutation
      .mutateAsync(row)
      .then(r => {
        // queryClient.invalidateQueries(QUERY_KEYS.PERMISSIONS_ALL);
        message.success('New permission is created', 4.5);
        newPermission.permission_id -= 1;
        setNewRow(newPermission);
        setIsModalVisible(false);
      })
      .catch(reason => {
        notification['error']({
          message: 'Error creating new permission',
          description: reason.message,
          duration: 0,
        });
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Row>
        <Col>
          <Button type="default" onClick={() => setIsModalVisible(true)}>
            Add New
          </Button>
        </Col>
      </Row>
      {permissionQuery.isSuccess && (
        <Row>
          <Col flex={16}>
            <PermissionsTable
              data={permissionQuery.data}
              rowClickHandler={rowClickHandler}
            />
          </Col>
          <Col flex={8}>
            {currentRow && (
              <PermissionsForm
                key={currentRow.permission_id}
                data={permissionQuery.data}
                permission={currentRow}
                saveHandler={saveRowHandler}
              />
            )}
          </Col>
        </Row>
      )}
      {permissionQuery.isSuccess && (
        <Modal
          title="Add New Permission"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <PermissionsForm
            key={'new-permission:' + newRow.permission_id}
            data={permissionQuery.data}
            permission={newRow}
            saveHandler={saveNewRowHandler}
          />
        </Modal>
      )}
    </div>
  );
}
