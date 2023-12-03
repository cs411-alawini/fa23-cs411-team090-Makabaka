import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

function RelatedGames({ relatedGames }) {
    const navigateToGame = (gameId) => {
        window.location.href = `/games/${gameId}`;
    };

    return (
        <Grid container spacing={2}>
            {relatedGames.map((game) => (
                <Grid item xs={12} sm={6} md={4} key={game.QueryID}>
                    <Card>
                        <CardActionArea onClick={() => navigateToGame(game.QueryID)}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={game.HeaderImage}
                                alt={game.QueryName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {game.QueryName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Release Date: {game.ReleaseDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {game.PriceCurrency} {game.PriceFinal}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Recommendations: {game.RecommendationCount}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default RelatedGames;
