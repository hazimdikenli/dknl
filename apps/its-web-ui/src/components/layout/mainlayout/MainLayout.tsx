import React from 'react'
import css from './MainLayout.module.css'
import HeaderBar from './headerbar/HeaderBar'
import SideBar from './sidebar/SideBar'
import SideMenu from './sidemenu/SideMenu'

type Props = {content: React.ReactNode}

export default function MainLayout({content}: Props) {
  return (
    <div className={css.Container}>
      <div className={css.Header}>
        <HeaderBar/>
      </div>
      <div className={css.SNav}>
        <SideBar/>
      </div>
      <div className={css.MNav}>
        <SideMenu />
      </div>
      <div className={css.Content}>
        <div>{content}</div>
      </div>

    </div>
  )
}