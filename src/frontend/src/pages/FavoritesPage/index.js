import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Pagination, Grid } from '@mui/material';

import GameReferralCard from '../../components/GameReferralCard';
import AppBar from '../../components/AppBar'
import Footer from '../../components/Footer'

function FavoritesPage(props) {
    const { user, handleLogout } = props;
    const { userid } = useParams();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    if (!user || user.UserID !== parseInt(userid)) {
        navigate(`/page-not-found`);
    }

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) {
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${user.UserID}/allfavor?page=${page}&sortField=RecommendationCount&sortOrder=desc`);
            const data = await response.json();
            setFavorites(data.data);
            setMaxPage(data.maxPage);
        };
    
        fetchFavorites();
    }, [user, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="FavoritesPage">
            <header className="FavoritesPage-header">
                <AppBar user={user} handleLogout={handleLogout} />
                <Box sx={{ mt: 10 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} />
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                {favorites.map(game => (
                                    <Grid item xs={12} sm={6} key={game.QueryID}>
                                        <GameReferralCard gameData={game} />
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination count={maxPage} page={page} onChange={handlePageChange} />
                        </Grid>
                        <Grid item xs={2} />
                    </Grid>
                </Box>
                <Footer />
            </header>
        </div>
    );
};

export default FavoritesPage;
