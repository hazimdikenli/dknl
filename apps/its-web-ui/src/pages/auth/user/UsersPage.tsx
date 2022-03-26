import { Button, Col, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserList, QUERY_KEYS } from '../../../state';
import { UserListDto } from '../../../types';
import UsersList from './UsersList';

type Props = {};

export default function UsersPage({}: Props): ReactElement {
  let navigate = useNavigate();
  const {pathname} = useLocation();

  const userQuery = useQuery(QUERY_KEYS.USERS_ALL, getUserList);

  const rowClickHandler = (row: UserListDto) => {
    console.log(row);
  };
  return (
    <div>
      <Row>
        <Col>
          <Button type="default"
          onClick={()=> {navigate('/auth/users/new')}}
          >Add New</Button>
        </Col>
      </Row>
      {userQuery.isSuccess && (
        <Row>
          <Col flex={16}>
            <UsersList
              data={userQuery.data}
              rowClickHandler={rowClickHandler}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

