import React from 'react'
import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

import css from './HeaderBar.module.css';
interface Props {
  
}

const HeaderBar = (props: Props) => {
  return (
    <div className={css.Container}>
      <HashtagIcon />
      <Title />
      {/* <ThemeIcon /> */}
      <Search />
      <BellIcon />
      <UserCircle />
    </div>
  )
}

const Search = () => (
  <div className={css.Search}>
    <input className={css.SearchInput} type='text' placeholder='Search...' />
    <FaSearch size='18' className='text-secondary my-auto' />
  </div>
);
const BellIcon = () => <FaRegBell size='24' className={css.Icon} />;
const UserCircle = () => <FaUserCircle size='24' className={css.Icon} />;
const HashtagIcon = () => <FaHashtag size='20' className={css.TitleHashtag} />;
const Title = () => <h5 className='title-text'>tailwind-css</h5>;


export default HeaderBar
