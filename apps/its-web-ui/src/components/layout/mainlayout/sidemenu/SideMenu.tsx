import React from 'react'
import css from './SideMenu.module.css';
import { FaFire, FaPoo } from 'react-icons/fa';

interface Props {
  
}

const SideMenu = (props: Props) => {
  return (
    <div className={css.Container}>
      <div className={css.Search}>
        <input type='search' placeholder='find or start a task'/>
      </div>
      <div>
        <i>cjammle 1</i>
        <i>cjammle 1</i>
        <i>cjammle 1</i>
      </div>
      <div className={css.UserInfo}>
        <i>Hazim Dikenli </i>
        <i>Muted </i>
        <FaFire/>
      </div>
    </div>
  )
}

export default SideMenu
