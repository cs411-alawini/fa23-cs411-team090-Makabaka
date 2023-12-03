import React from 'react';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

function UserMenu(props) {
    const { handleOpenUserMenu, anchorElUser, handleCloseUserMenu, user, handleLogout } = props;

    const navigate = useNavigate();

    const settings = user
        ? ['Favorites', 'Logout']
        : ['Login'];

    const handleMenuClick = (setting) => {
        // Close the menu before when to another pages
        handleCloseUserMenu();
        if (setting === "Login") {
            navigate("/login");
        } else if (setting === "Logout") {
            handleLogout();
        } else if (setting === "Favorites") {
            navigate(`/${user.UserID}/favorites`);
        }
    };

    return (
        <>
            {/* The tooltip displays when the user hovers over the icon */}
            <Tooltip title="Open settings">
                {/* The icon button that displays the user's avatar */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Default" src="/static/images/avatar/Default.jpeg" />
                </IconButton>
            </Tooltip>

            {/* The menu that displays the user's settings */}
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {/* The menu items that display each setting */}
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default UserMenu;
