import { Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Home.css'
export default function Home() {
    //array used for displaying in dropdowns
    const [firstOption, setFirstOption] = useState(['A', 'B', 'C', 'D', 'E'])
    const [mainOption, setMainOption] = useState(['A', 'B', 'C', 'D', 'E'])


    //these are used for the value updations in second and third arrays
    const [secondOption, setSecondOption] = useState(['A', 'B', 'C', 'D', 'E'])
    const [thirdOption, setThirdOption] = useState(['A', 'B', 'C', 'D', 'E'])
    const [bool, setBool] = useState(false)
    useEffect(() => {
        let a = 10
        console.log("rendering", a)
    }, [bool])

    //function handles first dropdown
    const firstSelect = (e) => {
        let array = [...mainOption]
        const index = array.indexOf(e.target.value)
        const newArray = array.splice(index, 1)
        setBool(!bool)
        setFirstOption(array)
        setSecondOption(array)
        document.getElementById('firstDrop').innerHTML = e.target.value
    }

    //function handles second dropdown
    const secondSelect = (e) => {
        let array = [...secondOption]
        const index = array.indexOf(e.target.value)
        const newArray = array.splice(index, 1)
        setBool(!bool)
        setFirstOption(array)
        setThirdOption(array)
        document.getElementById('secondDrop').innerHTML = e.target.value
    }
    //function handles third dropdown
    const thirdSelect = (e) => {
        let array = [...thirdOption]
        const index = array.indexOf(e.target.value)
        const newArray = array.splice(index, 1)
        setBool(!bool)
        setFirstOption(array)
        document.getElementById('thirdDrop').innerHTML = e.target.value
    }

    //function handles the submit button
    const submit = () => {
        let first = document.getElementById('firstDrop').innerHTML
        let second = document.getElementById('secondDrop').innerHTML
        let third = document.getElementById('thirdDrop').innerHTML

        if (mainOption.includes(first) && mainOption.includes(second) && mainOption.includes(third)) {
            alert("Data Submitted")
            console.log("First Dropdown :", first)
            console.log("Second Dropdown :", second)
            console.log("Third Dropdown :", third)
        } else {
            console.log("Error!!! Not all dropdowns are Selected")
            alert("Error!!! Not all dropdowns are Selected")
        }
    }
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md">
                <Typography align="center" className="text-white mt-3" variant="h4">Machine Test</Typography>
                <Grid container className="insideBox" direction="row" alignItems="center" justify="space-evenly">
                    <Grid item >
                        <FormControl style={{ minWidth: "12em" }}>
                            <InputLabel className="text-white" id="firstDropdown">First Dropdown</InputLabel>
                            <Select id="firstDrop" labelId="firstDropdown" onChange={firstSelect} name="First" style={{ color: "white" }}>
                                {firstOption.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data}>{data}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <FormControl style={{ minWidth: "12em" }}>
                            <InputLabel className="text-white" id="secondDropdown">Second Dropdown</InputLabel>
                            <Select labelId="secondDropdown" id="secondDrop" onChange={secondSelect} name="Second" style={{ color: "white" }}>
                                {firstOption.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data}>{data}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <FormControl style={{ minWidth: "12em" }}>
                            <InputLabel className="text-white" id="thirdDropdown">Third Dropdown</InputLabel>
                            <Select labelId="thirdDropdown" id="thirdDrop" onChange={thirdSelect} name="Third" style={{ color: "white" }}>
                                {firstOption.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data}>{data}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item align="center" xs="12">
                        <Button variant="contained" className="bg-success text-white" onClick={submit}>Submit</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
