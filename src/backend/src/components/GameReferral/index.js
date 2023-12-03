import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import GameReferralCard from '../GameReferralCard';

function GameReferral({ title, gameDetails }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % gameDetails.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
        currentIndex === 0 ? gameDetails.length - 1 : currentIndex - 1
        );
    };

    const getVisibleCards = () => {
        const visibleIndices = [
            currentIndex,
            (currentIndex + 1) % gameDetails.length,
            (currentIndex + 2) % gameDetails.length,
        ];

        return visibleIndices.map((index) => gameDetails[index]);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom align="left">
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={prevSlide}>
                    <ArrowBackIosIcon />
                </IconButton>

                <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                    {getVisibleCards().map((detail, index) => (
                    <Box
                        key={index}
                        sx={{
                        width: '33.33%',
                        }}
                    >
                        <GameReferralCard gameData={detail} />
                    </Box>
                    ))}
                </Box>

                <IconButton onClick={nextSlide}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>
        
    );
}

export default GameReferral;
