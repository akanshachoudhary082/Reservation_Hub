import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Button, TextField, Box, InputAdornment, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles'; 
import logo from '../assets/images/Reservation_Hub_Logo.jpg'; 
import SearchIcon from '@mui/icons-material/Search'; 
import Cookies from 'js-cookie';
import MenuIcon from '@mui/icons-material/Menu'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toggleDrawer, openProfileMenu, closeProfileMenu } from '../redux/actions/navbarActions';  
import CitySelectionPopup from '../components/CitySelectionPopup'; 
import { setSelectedCity } from '../redux/actions/eventAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const { openDrawer, profileMenuAnchorEl } = useSelector(state => state.navbar); 
    const [context, setContext] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await axios.post('https://localhost:8443/users/logout', {}, {
                withCredentials: true, 
            });
    
            Cookies.remove('jwtToken'); 
            handleProfileMenuClose();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    const handleMoviesClick = () => {
        setContext('movies');
        setOpenPopup(true); 
    };

    const handleCitySelectforMovies = (city) => {
        dispatch(setSelectedCity(city)); // Dispatch action to set selected city
        navigate(`/movies/${city}`); // Navigate to the Movies page with the selected city
        setOpenPopup(false);
    };

    const handleEventsClick = () => {
        setContext('events');
        setOpenPopup(true); 
    };

    const handleCitySelectforEvents = (city) => {
        console.log("Selected City for Events:", city); 
        dispatch(setSelectedCity(city)); // Dispatch action to set selected city
        navigate(`/events/${city}`); // Navigate to the Events page with the selected city
        setOpenPopup(false);
    };

    const handleProfileMenuOpen = (event) => {
        dispatch(openProfileMenu(event.currentTarget)); 
    };
    
    const handleProfileMenuClose = () => {
        dispatch(closeProfileMenu());
    };

    const handleDrawerToggle = () => {
        dispatch(toggleDrawer()); 
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
                <Toolbar>
                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                width: '100px',
                                height: 'auto',
                                marginRight: 10,
                            }}
                        />
                    </Link>

                    {/* Search Bar */}
                    <Box sx={{ mr: 2, flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search..."
                            sx={(theme) => ({
                                position: 'relative',
                                borderRadius: theme.shape.borderRadius,
                                backgroundColor: alpha(theme.palette.common.white, 0.15),
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.common.white, 0.25),
                                },
                                marginRight: theme.spacing(2),
                                width: '100%',
                                [theme.breakpoints.up(' sm')]: {
                                    marginLeft: theme.spacing(3),
                                    width: 'auto',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    width: '70%',
                                },
                            })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Hamburger Menu (Drawer) for mobile */}
                    <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} color="inherit" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>

                    {/* Navigation Buttons for Desktop */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Button color="inherit" component={Link} to="/aboutUs">About</Button>
                        <Button color="inherit" component={Link} to="/transport">Transport</Button>
                        <Button color="inherit" onClick={handleMoviesClick}>Movies</Button>
                        <Button color="inherit" onClick={handleEventsClick}>Events</Button>
                        <Button color="inherit" component={Link} to="/contactUs">Contact</Button>
                    </Box>

                    {/* Profile Icon */}
                    <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ ml: 2 }}>
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>

                {/* Profile Menu (Dropdown) */}
                <Menu anchorEl={profileMenuAnchorEl} open={Boolean(profileMenuAnchorEl)} onClose={handleProfileMenuClose}>
                    <MenuItem component={Link} to="/account" onClick={handleProfileMenuClose}>My Account</MenuItem>
                    <MenuItem component={Link} to="/login" onClick={handleProfileMenuClose}>Login</MenuItem>
                    <MenuItem component={Link} to="/signin" onClick={handleProfileMenuClose}>SignIn</MenuItem>
                    <MenuItem component={Link} to="/register" onClick={handleProfileMenuClose}>Register</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Handle Logout */}
                </Menu>

                {/* Drawer (Hamburger Menu) */}
                <Drawer anchor="right" open={openDrawer} onClose={handleDrawerToggle}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                        <List>
                            {['Home', 'Transport', 'Movies', 'Events', 'ContactUs', 'Login', 'Register'].map((item, index) => (
                                <ListItem button key={index} component={Link} to={`/${item.toLowerCase()}`}>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </AppBar>
            <CitySelectionPopup
                open={openPopup}
                onClose={() => setOpenPopup(false)}
                onSelectCity={(city) => {
                    if (context === 'movies') {
                        handleCitySelectforMovies(city);
                    } else if (context === 'events') {
                        handleCitySelectforEvents(city);
                    }
                }}
            />
        </>
    );
};

export default Navbar;