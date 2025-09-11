import React from 'react';
import { NavLink } from 'react-router-dom';

function getLinkClass({ isActive }: { isActive: boolean }) {
  return `${isActive ? ' bg-zinc-800 font-bold' : ''} text-white no-underline px-4 py-2.5 mb-2.5 rounded transition-colors duration-300`;
}

function Sidebar() {
  return (
    <aside className="sidebar w-[150px] min-w-[150px] h-screen bg-zinc-950 text-white p-5 box-border sticky">
      <h2 className="text-[1.5em] font-bold mb-7.5">Menu</h2>
      <nav className="nav-links flex flex-col absolute">
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
