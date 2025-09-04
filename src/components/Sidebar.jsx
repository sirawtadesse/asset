import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleIcon from '@mui/icons-material/People';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/', role: ['admin', 'employee'] },
        { text: 'Assets', icon: <ComputerIcon />, path: '/assets', role: ['admin', 'employee'] },
        { text: 'Employees', icon: <PeopleIcon />, path: '/employees', role: ['admin'] },
        // Add other links here (Departments, Locations, etc.)
    ];

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuItems.map((item) => (
                    item.role.includes(user.role) && (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={RouterLink} to={item.path}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    )
                ))}
            </List>
        </div>
    );
};

export default Sidebar;