import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  themePreference: string;
  setThemePreference: (arg0: string) => void;
}

const Navbar = ({ themePreference, setThemePreference }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  return (
    <div className={ scrolled ? "navbar bg-base-100 sticky top-0 z-50 shadow-md" : "navbar bg-base-100"}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold" : "font-regular")}>
                Notes
              </NavLink>
            </li>
            <li>
              <NavLink to="/characters" className={({ isActive }) => (isActive ? "font-bold" : "font-regular")}>
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink to="/info" className={({ isActive }) => (isActive ? "font-bold" : "font-regular")}>
                Info
              </NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          Notes App
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold" : "font-regular")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/characters" className={({ isActive }) => (isActive ? "font-bold" : "font-regular")}>
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/info" className={({ isActive }) => (isActive ? "font-bold" : "font-regular")}>
              Info
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate invisible md:visible">
          <input
            type="checkbox"
            className="theme-controller"
            value="dark"
            checked={themePreference == "dark" ? true : false}
            onChange={() => setThemePreference(themePreference == "dark" ? "light" : "dark")}
          />
          {/* sun icon */}
          <svg className="swap-on w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          {/* moon icon */}
          <svg className="swap-off w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Navbar;