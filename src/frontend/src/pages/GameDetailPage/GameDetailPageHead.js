import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const GameDetailPageHead = ({ user, detail, gameGenre }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const genreDisplay = gameGenre.map(genre => genre.GenreName).join(" | ");
    
    useEffect(() => {
        if (!user) {
            return;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/user/${user.UserID}/favor`, { gameID: detail.QueryID })
            .then(response => setIsFavorite(response.data.isFavorite))
            .catch(error => console.error('Error:', error));
    }, [user, detail.QueryID]);
    
    const handleFavoriteClick = () => {
        const apiEndpoint = isFavorite ? `${process.env.REACT_APP_API_URL}/api/user/${user.UserID}/removefavor` : `${process.env.REACT_APP_API_URL}/api/user/${user.UserID}/addfavor`;
        axios.post(apiEndpoint, { userID: user.UserID, gameID: detail.QueryID })
            .then(response => {
                if (response.status === 200) {
                    setIsFavorite(!isFavorite);
                }
                console.log(response.data.message);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <Box
            sx={{
                height: '50vh',
                backgroundSize: 'cover',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${detail.HeaderImage})`,
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: 2,
                textAlign: 'left',
                color: 'white',
            }}
        >
            <Box sx={{ marginLeft: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" sx={{ marginRight: 1 }}>
                        {detail.QueryName}
                    </Typography>
                    <IconButton onClick={handleFavoriteClick}>
                        {isFavorite ? <StarIcon style={{ color: 'orange' }} /> : <StarIcon style={{ color: 'white' }} />}
                    </IconButton>
                </Box>
                <Typography variant="subtitle1">
                    Recommendation Count: {detail.RecommendationCount}
                </Typography>
                <Typography variant="subtitle1">
                    {detail.IsFree ? 'FREE' : `${detail.PriceCurrency} | ${detail.PriceFinal}`}
                </Typography>

                <Typography variant="subtitle1">
                    {genreDisplay}
                </Typography>
            </Box>
        </Box>
    );
};

export default GameDetailPageHead;
