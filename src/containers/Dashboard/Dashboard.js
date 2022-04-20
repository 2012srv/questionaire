import React, { useEffect, useState } from "react";

import { styled, useTheme } from '@mui/material/styles';
import { alpha, Avatar, Card, Divider, Grid, Typography } from "@mui/material";

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BarChartIcon from '@mui/icons-material/BarChart';

const AppCard = styled(Card)(({ theme, current, completed }) => {
    // console.log(theme);
    return ({
        padding: 20
    })
});


const Dashboard = () => {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
                <AppCard>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="h5" mb={2}>
                                Total Active Users
                            </Typography>
                            <Grid container>
                                <Grid item mr={1}>
                                    <Avatar sx={{ width: 30, height: 30, backgroundColor: alpha(theme.palette.success['light'], 0.3) }} >
                                        <TrendingUpIcon color="success" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" mt={0.5} pt={0.5}>
                                        +2.6
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* <Divider /> */}
                            <Typography variant="h1" mt={2}>
                                18,655
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <BarChartIcon sx={{ fontSize: 50, mt: 4 }} color="success" />
                        </Grid>
                    </Grid>
                </AppCard>
            </Grid>
            <Grid item xs={6} md={4}>
                <AppCard>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="h5" mb={2}>
                                Total Installed
                            </Typography>
                            <Grid container>
                                <Grid item mr={1}>
                                    <Avatar sx={{ width: 30, height: 30, backgroundColor: alpha(theme.palette.success['light'], 0.3) }} >
                                        <TrendingUpIcon color="success" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" mt={0.5} pt={0.5}>
                                        +1.2
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* <Divider /> */}
                            <Typography variant="h1" mt={2}>
                                3,500
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <BarChartIcon sx={{ fontSize: 50, mt: 4 }} color="info" />
                        </Grid>
                    </Grid>
                </AppCard>
            </Grid>
            <Grid item xs={6} md={4}>
                <AppCard>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="h5" mb={2}>
                                Total Downloads
                            </Typography>
                            <Grid container>
                                <Grid item mr={1}>
                                    <Avatar sx={{ width: 30, height: 30, backgroundColor: alpha(theme.palette.error['light'], 0.3) }} >
                                        <TrendingDownIcon color="error" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" mt={0.5} pt={0.5}>
                                        -2.6
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* <Divider /> */}
                            <Typography variant="h1" mt={2}>
                                8,055
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <BarChartIcon sx={{ fontSize: 50, mt: 4 }} color="error" />
                        </Grid>
                    </Grid>
                </AppCard>
            </Grid>
        </Grid>

    )
}

export default Dashboard;