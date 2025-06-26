import React from 'react';
import { NavLink } from 'react-router-dom';
import 'src/renderer/components/Sidebar.css';

function getLinkClass({ isActive }: { isActive: boolean }) {
  return `nav-link${isActive ? ' active' : ''}`;
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <nav className="nav-links">
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/checks" className={getLinkClass}>
          Checks
        </NavLink>
        {/*<NavLink to="/tutorial" className={getLinkClass}>*/}
        {/*  Tutorial*/}
        {/*</NavLink>*/}
        <NavLink to="/settings" className={getLinkClass}>
          Settings
        </NavLink>
        <NavLink to="/about" className={getLinkClass}>
          About
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
