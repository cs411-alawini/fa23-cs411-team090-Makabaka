import React from 'react';
import {
    Typography,
    Link,
    Box,
} from "@mui/material";

const GameDetails = ({ detail }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            {detail.QueryName && (
                <>
                    <Typography variant="h6" component="div">Game Name</Typography>
                    <Typography>{detail.QueryName}</Typography>
                </>
            )}

            {detail.ReleaseDate && (
                <>
                    <Typography variant="h6" component="div">Release Date</Typography>
                    <Typography>{detail.ReleaseDate}</Typography>
                </>
            )}

            {(detail.RequiredAge !== undefined && detail.RequiredAge !== null) && (
                <>
                    <Typography variant="h6" component="div">Required Age</Typography>
                    <Typography>{`${detail.RequiredAge}+`}</Typography>
                </>
            )}

            {detail.ControllerSupport !== undefined && (
                <>
                    <Typography variant="h6" component="div">Controller Support</Typography>
                    <Typography>{detail.ControllerSupport ? 'Supported' : 'Not Supported'}</Typography>
                </>
            )}

            {detail.SupportURL && (
                <>
                    <Typography variant="h6" component="div">Support URL</Typography>
                    <Link href={detail.SupportURL} target="_blank" rel="noopener noreferrer">
                        Visit Support
                    </Link>
                </>
            )}

            {detail.DetailedDescrip && (
                <>
                    <Typography variant="h6" component="div">Description</Typography>
                    <Typography>{detail.DetailedDescrip}</Typography>
                </>
            )}

            {detail.SupportedLanguages && (
                <>
                    <Typography variant="h6" component="div">Supported Languages</Typography>
                    <Typography>{detail.SupportedLanguages}</Typography>
                </>
            )}
        </Box>
    );
};

export default GameDetails;
