import React from 'react'
import css from './SideMenu.module.css';
import { FaFire, FaPoo } from 'react-icons/fa';
import SideSubMenu from './SideSubMenu';

interface Props {
  
}

const SideMenu = (props: Props) => {
  return (
    <div className={css.Container}>
      <div>
        Demo Corp
      </div>
      <SideSubMenu />
      <div className={css.UserInfo}>
        <i>Hazim Dikenli </i>
        <i>Muted </i>
        <FaFire/>
      </div>
    </div>
  )
}

export default SideMenu
