import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {SidebarData} from './SidebarData';
import './Sidebar.css';
import Dashboard from '../../pages/Dashboard';
import MyProfile from '../../pages/MyProfile';
import ScrubReports from '../../pages/ScrubReports';
import ScrubRooms from '../../pages/ScrubRooms';
import StaffMembers from '../../pages/StaffMembers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <Router>
            <div className="sidebar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>           
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
    

                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                {SidebarData.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                );
                })}

                </ul>

            </nav>
                <Routes>
                    <Route exact path='/'  element={<Dashboard />}/>
                    <Route exact path='/myprofile' element={<MyProfile />}/>
                    <Route exact path='/scrubreports' element={<ScrubReports />}/>
                    <Route exact path='/scrubrooms' element={<ScrubRooms />}/>
                    <Route exact path='/staffmembers' element={<StaffMembers />}/>
                </Routes>

            </Router>
        </>
    )
}

export default Sidebar
