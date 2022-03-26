import { Menu } from 'antd';
import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { convertListToTreeData } from '../../../../utils/tree.helper';
import { Link, useLocation, useNavigate } from 'react-router-dom';
type Props = {};

interface MenuItemData {
  id: string;
  parentId?: string;
  title: string;
  iconIdentifier?: string;
  url?: string;
}
const menuItems: MenuItemData[] = [
  {
    id: 'admin.auth',
    title: 'Authorization Management',
  },
  {
    id: 'admin.auth.permissions',
    parentId: 'admin.auth',
    title: 'Permissions',
    url: '/auth/permissions',
  },
  {
    id: 'admin.auth.roles',
    parentId: 'admin.auth',
    title: 'Roles',
    url: '/auth/roles',
  },
  {
    id: 'admin.auth.groups',
    parentId: 'admin.auth',
    title: 'Groups',
    url: '/auth/groups',
  },
  {
    id: 'admin.auth.users',
    parentId: 'admin.auth',
    title: 'Users',
    url: '/auth/users',
  },
  {
    id: 'admin.menu',
    title: 'Menu',
  },
  {
    id: 'admin.menu.items',
    parentId: 'admin.menu',
    title: 'Menu Items',
    url: '/auth/menu',
  },
];
export default function SideSubMenu({}: Props) {
  const navigation = useNavigate();
  const location = useLocation();
  console.log(location);

  const treeData = convertListToTreeData(menuItems, 'id', 'parentId');
  const currentMenuItem = menuItems.find(
    f => f.url === location.pathname,
  );
  const defaultSelectedKeys: string[] = [];
  const defaultOpenKeys: string[] = [];

  if (currentMenuItem) {
    defaultSelectedKeys.push(currentMenuItem.id);
    const parent = menuItems.find(f => f.id === currentMenuItem.parentId);
    if (parent) {
      defaultOpenKeys.push(parent.id);
    }
  }
  console.log({defaultOpenKeys, defaultSelectedKeys})

  return (
    <Menu
      // onClick={this.handleClick}
      style={{
        marginBottom: 'auto',
        // width: 256,
        // backgroundColor: 'var(--background-secondary)'
      }}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline"
      theme="dark"
    >
      {treeData.map(sm => (
        <SubMenu key={sm.id} title={sm.title}>
          {sm.children?.map(mi => (
            <Menu.Item key={mi.id}>
              <Link to={mi.url ?? ''}>{mi.title}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}
