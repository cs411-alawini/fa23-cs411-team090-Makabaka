import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function PlatformRequirements({ gamePlatform }) {
    return (
        <Grid container spacing={2}>
            {gamePlatform.map((platform, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card variant="outlined" sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {platform.PlatformName}
                            </Typography>
                            <Typography variant="subtitle1">
                                Minimum Requirements
                            </Typography>
                            <Typography variant="body2" paragraph>
                                {platform.MinReqsText || 'Not Available'}
                            </Typography>
                            <Typography variant="subtitle1">
                                Recommended Requirements
                            </Typography>
                            <Typography variant="body2">
                                {platform.RecReqsText || 'Not Available'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PlatformRequirements;
