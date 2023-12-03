import { Grid, Typography, Button, Box } from '@mui/material';
import useStyles from '../../style/style';

const AboutUsPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.aboutUsContainer}>
            <Grid container spacing={6} className={classes.gridContainer}>
                <Grid item xs={12} md={5}>
                    <img src={'/static/images/LoginImage/LoginImage_1-3201x5101.jpg'} alt="My Team" className={classes.largeImage} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h3" fontWeight={700} className={classes.title}>
                        YemRev
                    </Typography>
                    <Typography className={classes.aboutUsSubtitle}>
                        ToDo
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px' }}
                    >
                        CONTACT US
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutUsPage;
