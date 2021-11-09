import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg'

export const SidebarData = [
    {
        title: 'Dashboard',
        path : '/',
        icon: <MdIcons.MdDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Staff Members',
        path : '/staffmembers',
        icon: <BsIcons.BsFillPeopleFill />,
        cName: 'nav-text'
    },
    {
        title: 'Scrub Rooms',
        path : '/scrubrooms',
        icon: <FaIcons.FaDoorOpen />,
        cName: 'nav-text'
    },
    {
        title: 'Scrub Reports',
        path : '/scrubreports',
        icon: <MdIcons.MdReportProblem />,
        cName: 'nav-text'
    },
    {
        title: 'My Profile',
        path : '/myprofile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    } 
];