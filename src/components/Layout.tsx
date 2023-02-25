import { Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, CssBaseline, Box, Button, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';
import ForestIcon from '@mui/icons-material/Forest';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Main from './Main';
import Tree from './Tree';
import Annals from './Annals';
import Contact from './Contact';
import Timeline from './Timeline';

import { useReducer } from 'react';
import { initialState } from '../store/initialState';
import reducer from '../store/reducer';



function Layout() {
    const myTheme = createTheme();
    const drawerWidth: number = 240;
    const [state, dispatch] = useReducer(reducer, initialState);

    // DEBUG TOOL for checking TITLE SUCCESSION
    function DEBUGTITLE() {
        let list: string[] = [];
        const title = state.titles[0].succession_list
        const people = state.living_people
        for (let i=0; i<title.length; i++) {
            let heir = people.find(person => person.id === title[i]);
            if (heir !== undefined) { list.push(`${heir.name}, ${heir.sex}, age ${heir.age}`)};
        };
        console.log(`Year ${state.year.current}`, list);
        console.log(state);    
    }

    return (
        <ThemeProvider theme={ myTheme }>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar >
                        <Stack direction="row" spacing={6}>
                       <Button variant="contained" 
                        disableElevation
                        disabled={state.sim_check === true}
                        onClick={()=> {
                            dispatch({
                                type: 'START_SIM'
                            });
                        }}>
                            Start
                        </Button>
                       <Button variant="contained" 
                        disableElevation
                        disabled={!state.sim_check}
                        onClick={()=> {
                            dispatch({
                                type: 'RESET_SIM'
                            })
                        }}
                        >
                            Restart
                        </Button>
                       <Button variant="contained" 
                        disableElevation
                        disabled={!state.sim_check}
                        onClick={() => {
                            dispatch({
                                type: 'INCREMENT_YEAR'
                            })
                        }}
                        >
                            Next
                        </Button>
                        {/*temporary-- the SAVE button repurposed for debugging. Just to see state...*/}
                        <Button variant="contained" 
                        disableElevation
                        onClick={()=>{DEBUGTITLE()}}
                        >
                            Save
                        </Button>
                    </Stack>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem key='Main' disablePadding>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CottageIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Main' />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key='Tree' disablePadding>
                            <Link to="/tree" style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ForestIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Tree' />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key='Annals' disablePadding>
                            <Link to="/annals" style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LibraryBooksIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Annals' />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key='Timeline' disablePadding>
                            <Link to="/timeline" style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ViewTimelineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Timeline' />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key='Contact' disablePadding>
                            <Link to="/contact" style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ContactSupportIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Contact' />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<Main />}/>
                        <Route path="/tree" element={<Tree />}/>
                        <Route path="/annals" element={<Annals year={ state.year } people={ state.living_people } events={ state.events }/>}/>
                        <Route path="/timeline" element={<Timeline />}/>
                        <Route path="/contact" element={<Contact />}/>
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Layout;