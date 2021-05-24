import { AppBar, Button, CssBaseline, Grid, Hidden, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { AccountCircle, CreateOutlined, DeleteOutlined, MoreHoriz, PhonelinkSetupOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './Header.css'
export default function Header() {
    //menu on appbar on clicking target
    const [menu, setMenu] = useState(null)
    //name of the student
    const [name, setName] = useState()
    useEffect(() => {
        setName('Aditya Prasad')
    }, [])
    return (
        <div>
            <CssBaseline>
                <AppBar position="relative" className="appBar">
                    <Toolbar>
                        <Grid container direction="row" justify="flex-end" alignItems="center" alignContent="center">
                            <Grid item lg="6" md="6" xs="10" >
                                <AccountCircle fontSize="large" className="personIcon" />
                                <Typography variant="h6" className="personName">{name}</Typography>
                            </Grid>
                            <Grid item lg="4" md="4" xs="2">
                                <Hidden smDown>
                                    <Button variant="outlined" style={{ marginRight: "5%" }} color="primary" startIcon={<PhonelinkSetupOutlined />}>Add Device</Button>
                                </Hidden>
                                <MoreHoriz onClick={(event) => setMenu(event.currentTarget)} fontSize="medium" className="threeDots" />
                                <Menu id="header-menu" anchorEl={menu} keepMounted open={Boolean(menu)} onClose={() => setMenu(null)}>
                                    <Hidden mdUp>
                                        <MenuItem>
                                            <ListItemIcon style={{ minWidth: "25px" }}>
                                                <PhonelinkSetupOutlined fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Add Device</ListItemText>
                                        </MenuItem>
                                    </Hidden>
                                    <MenuItem>
                                        <ListItemIcon style={{ minWidth: "25px" }}>
                                            <CreateOutlined fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Edit Details</ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon style={{ minWidth: "25px" }}>
                                            <DeleteOutlined fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Delete Child</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </CssBaseline>
        </div>
    )
}
