import React, { FC, PropsWithChildren } from 'react';
import css from './SideBar.module.css';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

type Props = {};

const SideBar: FC<PropsWithChildren<Props>> = (
  props: PropsWithChildren<Props>
) => {
  return (
    <div className={css.sidebar}>
      <div className={css.macButtons}>m a c</div>
      <SideBarIcon icon={<FaFire size="28" />} />
      <Divider />
      <SideBarIcon icon={<BsPlus size="32" />} text="Home" />
      <SideBarIcon icon={<BsFillLightningFill size="20" />} text="Lightning" />
      <SideBarIcon icon={<FaPoo size="20" />} />
      <Divider />
      <SideBarIcon icon={<BsGearFill size="22" />} />

      {props.children}
    </div>
  );
};

const SideBarIcon = ({
  icon,
  text = 'tooltip 💡',
}: {
  icon: React.ReactNode;
  text?: string;
}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className={css.sidebarIcon}
      onMouseOver={() => setHover(true)}
      onMouseEnter={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {icon}
      {hover && <span className={css.sidebarTooltip}>{text}</span>}
    </div>
  );
};

const Divider = () => <hr className={css.sidebarDivider} />;

export default SideBar;
