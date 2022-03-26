import { Button, Col, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getRoleList, QUERY_KEYS } from '../../../state';
import { RoleListDto } from '../../../types';
import RolesList from './RolesList';

type Props = {};

export default function RolesPage({}: Props): ReactElement {
  const queryClient = useQueryClient();
  let navigate = useNavigate();

  const roleQuery = useQuery(QUERY_KEYS.ROLES_ALL, getRoleList);

  const rowClickHandler = (row: RoleListDto) => {
    console.log(row);
  };
  return (
    <div>
      <Row>
        <Col>
          <Button type="default"
          onClick={()=> {navigate('/auth/roles/new')}}
          >Add New</Button>
        </Col>
      </Row>
      {roleQuery.isSuccess && (
        <Row>
          <Col flex={16}>
            <RolesList
              data={roleQuery.data}
              rowClickHandler={rowClickHandler}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

