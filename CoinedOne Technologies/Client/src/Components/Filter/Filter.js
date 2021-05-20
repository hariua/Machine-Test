import { Button, Container, CssBaseline, FormControl, FormControlLabel, Grid, Hidden, Menu, Popover, Radio, RadioGroup, Typography } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import './Filter.css'
export default function Filter(props) {
    //dropdown enabling button on click
    const [btn, setBtn] = useState(null)
    //value of menu selected
    const [item, setItem] = useState(props.val)
    let history = useHistory()
    //pushing to another route by clicking on the menu
    const menuSelect = (event) => {
        setItem(event.target.value)
        setBtn(null)
        history.push('/summaryFilter=' + event.target.value)
    }
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md" >
                <Typography variant="h5" className="activityHeading">Activities Summary</Typography>
                <Grid container className="allGrid" justify="flex-start">
                    <Grid item>
                        <Button style={{ margin: "20% 40%", borderRadius: "2em" }} onClick={(event) => setBtn(event.currentTarget)} variant="outlined" color="primary" >{item}<ArrowDropDown /></Button>
                        {/* Dropdown Menu for desktop view */}
                        <Hidden smDown>
                            <Menu id="screen-select" anchorEl={btn} keepMounted open={Boolean(btn)} onClose={() => setBtn(null)}>
                                <Typography align="left" style={{ padding: "10px" }} variant="h6">Activities during which time is shown?</Typography>

                                <FormControl component="fieldset" style={{ padding: '20px' }}>
                                    <RadioGroup aria-label="time" name="select" onChange={menuSelect}>
                                        <Typography variant="h6">All</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle1">Activities during which class-study<br></br>study-time and play time are shown</Typography>
                                            <FormControlLabel style={{ marginLeft: "" }} value="All" control={<Radio />} />
                                        </Grid>
                                        <hr></hr>
                                        <Typography variant="h6">Class-time Only</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle1">Only the activities during the time you<br></br>schedules as class time are shown</Typography>
                                            <FormControlLabel style={{ marginLeft: "" }} value="Class" control={<Radio />} />
                                        </Grid>
                                        <hr></hr>
                                        <Typography variant="h6">Study-time Only</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle1">Only the activities during the time you<br></br>scheduled as study time or when <br></br> mannualy switched to study mode<br></br> from the mode page are shown</Typography>
                                            <FormControlLabel style={{ marginLeft: "80px" }} value="Study" control={<Radio />} />
                                        </Grid>
                                        <hr></hr>
                                        <Typography variant="h6">Free-time Only</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle1">Only the activities during the time you<br></br>scheduled as free time or when <br></br> mannualy switched to study mode<br></br> from the mode page are shown</Typography>
                                            <FormControlLabel style={{ marginLeft: "" }} value="Free" control={<Radio />} />
                                        </Grid>
                                    </RadioGroup>
                                </FormControl>

                            </Menu>
                        </Hidden>
                        {/* Dropdown Menu for mobile view */}
                        <Hidden mdUp>
                            <Popover
                                id="popover"
                                open={Boolean(btn)}
                                anchorEl={btn}
                                onClose={() => setBtn(null)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <FormControl component="fieldset" style={{ padding: '20px' }}>
                                    <RadioGroup aria-label="time" name="select" onChange={menuSelect}>
                                        <Typography variant="h6">All</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle2">Activities during which class-study<br></br>study-time and play time are shown</Typography>
                                            <FormControlLabel style={{ marginLeft: "" }} value="All" control={<Radio />} />
                                        </Grid>
                                        <hr></hr>
                                        <Typography variant="h6">Class-time Only</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle2">Only the activities during the<br></br> time you schedules as class time<br></br> are shown</Typography>
                                            <FormControlLabel style={{ marginLeft: "" }} value="Class" control={<Radio />} />
                                        </Grid>
                                        <hr></hr>
                                        <Typography variant="h6">Study-time Only</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle2">Only the activities during the time you<br></br>scheduled as study time or when <br></br> mannualy switched to study mode<br></br> from the mode page are shown</Typography>
                                            <FormControlLabel value="Study" control={<Radio />} />
                                        </Grid>
                                        <hr></hr>
                                        <Typography variant="h6">Free-time Only</Typography>
                                        <Grid container justify="space-between" direction="row" alignItems="center">
                                            <Typography variant="subtitle2">Only the activities during the time you<br></br>scheduled as free time or when <br></br> mannualy switched to study mode<br></br> from the mode page are shown</Typography>
                                            <FormControlLabel style={{ marginLeft: "" }} value="Free" control={<Radio />} />
                                        </Grid>
                                    </RadioGroup>
                                </FormControl>
                            </Popover>
                        </Hidden>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
