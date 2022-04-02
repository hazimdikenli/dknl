import { Button, Col, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { getGroupsList, getUserList, QUERY_KEYS } from '../../../state';
import { GroupListDto, UserListDto } from '../../../types';
import GroupsList from './GroupsList';

type Props = {};

export default function GroupsPage({}: Props): ReactElement {
  let navigate = useNavigate();
  const {pathname} = useLocation();

  const groupQuery = useQuery(QUERY_KEYS.GROUPS_ALL, getGroupsList);

  const rowClickHandler = (row: GroupListDto) => {
    console.log(row);
  };
  return (
    <div>
      <Row>
        <Col>
          <Button type="default"
          onClick={()=> {navigate('/auth/groups/new')}}
          >Add New</Button>
        </Col>
      </Row>
      {groupQuery.isSuccess && (
        <Row>
          <Col flex={16}>
            <GroupsList
              data={groupQuery.data}
              rowClickHandler={rowClickHandler}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

