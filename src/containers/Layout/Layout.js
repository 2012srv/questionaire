import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';

import { Outlet } from "react-router-dom";
import { Avatar, Button, Container, Divider, Icon, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[0],
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Layout(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const profileOpen = Boolean(anchorEl);
    const profileHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const profileHandleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Container>
                <AppBar position="fixed">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h1" noWrap component="div">
                            Logo
                        </Typography>
                        <Button
                            id="profile-button"
                            aria-controls={profileOpen ? 'profile-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={profileOpen ? 'true' : undefined}
                            sx={{ color: '#fff', paddingLeft: 0, paddingRight: 0 }}
                            onClick={profileHandleClick}
                        >
                            <Avatar sx={{ marginRight: 1 }}>C</Avatar><small>Cigniti</small><KeyboardArrowDownIcon />
                        </Button>
                        <Menu
                            id="profile-menu"
                            anchorEl={anchorEl}
                            open={profileOpen}
                            onClose={profileHandleClose}
                            MenuListProps={{
                                'aria-labelledby': 'profile-button',
                            }}
                        >
                            <MenuItem onClick={profileHandleClose}>
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Profile</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={profileHandleClose}>
                                <ListItemIcon>
                                    <ManageAccountsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>My Account</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={profileHandleClose}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                        {/* <Switch color="secondary" checked={props.themeChecked} onChange={props.changeTheme} /> */}
                    </Toolbar>
                </AppBar>

                <Box component="main" sx={{ flexGrow: 1, p: 3, my: 1 }}>
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Container>
        </Box>
    );
}