import { Button, Container, CssBaseline, Grid, LinearProgress, Typography } from '@material-ui/core'
import { LaptopMac, PhoneAndroid } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Sector } from 'recharts';
import './FreeTime.css'

export default function FreeTime() {
    const [activeIndex, setActiveIndex] = useState('0')
    const [freeTimeMax, setFreeTimeMax] = useState('0')
    const [freeTime, setFreeTime] = useState('0')
    const [progressFreeTime, setProgressFreeTime] = useState('0')
    const [graphData, setGraphData] = useState([])
    const [deviceTime, setDeviceTime] = useState('0')

    const [totalUsage,setTotalUsage]= useState('0')
    const [freeUsage,setFreeUsage]= useState('0')
    useEffect(() => {
        axios.get('https://api.mocklets.com/mock68182/screentime').then((response) => {
            let freeMin = parseInt(response.data[0].freeTimeMaxUsage)
            let hr = (freeMin / 60).toFixed(2)
            setFreeTimeMax(hr)
            let freeTimeTotal = parseInt(response.data[0].deviceUsage.freeTime.mobile) + parseInt(response.data[0].deviceUsage.freeTime.laptop)
            setFreeTime(freeTimeTotal)
            let progress = (freeTimeTotal / freeMin) * 100
            setProgressFreeTime(progress)

            let devUsage = response.data[0].deviceUsage.freeTime
            if (devUsage.laptop > 60) {
                let hra = devUsage.laptop / 60
                let hr = parseInt(hra)
                let min = devUsage.laptop - (hr * 60)
                devUsage.laptop = hr + "H:" + min + "m"
            } else {
                devUsage.laptop = devUsage.laptop + "m"
            }
            if (devUsage.mobile > 60) {
                let hra = devUsage.mobile / 60
                let hr = parseInt(hra)
                let min = devUsage.mobile - (hr * 60)
                devUsage.mobile = hr + "H: " + min + "m"
            } else {
                devUsage.mobile = devUsage.mobile + "m"
            }
            setDeviceTime(devUsage)
            let freeTime= parseInt(response.data[0].chartData.freeTime.total)
            if(freeTime>60)
            {
                let hrs = freeTime/60
                let hr = parseInt(hrs)
                let min = freeTime-(hr*60)
                freeTime = hr + "H : " + min
                setFreeUsage(freeTime)
            }else{
                setFreeUsage(freeTime)
            }
            let totalTime= parseInt(response.data[0].chartData.totalTime.total)
            if(totalTime>60)
            {
                let hrs = totalTime/60
                let hr = parseInt(hrs)
                let min = totalTime-(hr*60)
                totalTime = hr + "H : " + min
                setTotalUsage(totalTime)
            }else{
                setTotalUsage(totalTime)
            }
            const data = [
                { name: 'Total Time', value: parseInt(response.data[0].chartData.totalTime.total) },
                { name: 'Free Time', value: parseInt(response.data[0].chartData.freeTime.total) },
            ];
            setGraphData(data)
        })
    }, [])

    const onPieEnter = (_, index) => {
        setActiveIndex(index)
    }

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, payload, endAngle, fill, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"black"}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={"green"}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${value} : Mins`}</text>

            </g>
        );
    };

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md">
                <Grid container className="containerBox" direction="row" justify="space-around">
                    <Grid alignItems="center" item xs="12" md="4" sm="6">
                        {graphData.length > 0 ?
                            <div>
                                <Typography align="center" variant="h6" className="allScreenHead">Free Time</Typography>
                                <PieChart width={370} height={300}>
                                    <Pie
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        data={graphData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                    />

                                </PieChart>

                                <Grid container justify="space-evenly" direction="row" className="chartText">
                                    <Typography align="center" variant="subtitle2">Total Time:<br></br>{totalUsage + " Mins"}</Typography>
                                    <Typography align="center" variant="subtitle2">Free Time:<br></br>{freeUsage + " Mins"}</Typography>
                                </Grid>
                            </div>
                            : <div></div>}

                    </Grid>
                    <vr className="seperator"></vr>
                    <Grid item xs="12" sm="6" md="4">
                        <Typography align="center" variant="h6" className="freeTimeHead">Free-Time Usage</Typography>
                        <Grid container justify="space-between" direction="row">
                            <Typography variant="h6" style={{ margin: "2%" }}>Used<br></br><span className="text-success"><b>{freeTime + "mins"}</b></span></Typography>
                            <Typography variant="h6" style={{ margin: "2%" }}>Max<br></br><span ><b>{freeTimeMax + "Hr"}</b></span></Typography>
                        </Grid>
                        <LinearProgress style={{ padding: "3%", borderRadius: "1em", margin: "3% 3%" }} value={progressFreeTime} color="secondary" variant='determinate'></LinearProgress>
                        <Grid container justify="flex-end">
                            <Button style={{ marginTop: "2%" }} variant="outlined" size="small" color="primary">Extend Free Time</Button>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Button style={{ marginTop: "20%" }} variant="text" size="small" color="primary">Change Time Restrictions</Button>
                        </Grid>
                    </Grid>
                    <vr></vr>
                    <Grid item xs="12" sm="6" md="4">
                        <Typography align="center" variant="h6" className="freeTimeHead">By Devices</Typography>
                        <Grid container justify="space-evenly" alignItems="center" direction="column">
                            <Grid container justify="space-evenly" direction="row" >
                                <PhoneAndroid style={{ fontSize: "50px" }} />
                                <Typography style={{ paddingBottom: "5%" }} align="center" variant="h6">Adi's Phone<br></br>{deviceTime.mobile ? deviceTime.mobile : 0}</Typography>
                            </Grid>
                            <Grid container justify="space-evenly" direction="row" alignItems="center">
                                <LaptopMac style={{ fontSize: "50px" }} />
                                <Typography align="center" variant="h6">Adi's Laptop<br></br>{deviceTime.laptop ? deviceTime.laptop : 0}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Button style={{ marginTop: "23%" }} variant="text" size="small" color="primary">See All Devices</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
