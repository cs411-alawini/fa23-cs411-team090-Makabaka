import { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Grid } from '@mui/material';

import AppBar from '../../components/AppBar'
import Footer from '../../components/Footer'
import GameReferral from '../../components/GameReferral'

function ExplorerPage(props) {
    const { user, handleLogout } = props;
    
    const [topGames, setTopGames] = useState([]);
    
    const [topSinglePlayerGames, setTopSinglePlayerGames] = useState([]);
    const [topIndieGames, setTopIndieGames] = useState([]);
    const [topActionGames, setTopActionGames] = useState([]);
    const [topAdventureGames, setTopAdventureGames] = useState([]);
    const [topCasualGames, setTopCasualGames] = useState([]);
    
    
    useEffect(() => {
        const fetchTopGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/topgame`);
                setTopGames(response.data); // update the state
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        };
        const fetchTopSinglePlayerGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/top?genrel=singleplayer`);
                setTopSinglePlayerGames(response.data); // update the state
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        }
        const fetchTopIndieGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/top?genrel=indie`);
                setTopIndieGames(response.data); // update the state
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        }
        const fetchTopActionGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/top?genrel=action`);
                setTopActionGames(response.data); // update the state
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        }
        const fetchTopAdventureGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/top?genrel=adventure`);
                setTopAdventureGames(response.data); // update the state
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        }
        const fetchTopCasualGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/top?genrel=casual`);
                setTopCasualGames(response.data); // update the state
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        }
        
        fetchTopGames();
        fetchTopSinglePlayerGames();
        fetchTopIndieGames();
        fetchTopActionGames();
        fetchTopAdventureGames();
        fetchTopCasualGames();
    }, []);
    
    return (
        <div className="HomePage">
            <header className="HomePage-header">
                <AppBar 
                    user={user}
                    handleLogout={handleLogout}
                />
                <Box sx={{ mt: 10 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={0.5} />
                        <Grid item xs={11}>
                            <GameReferral title="Recommended Games" gameDetails={topGames} />
                            <Box height={32} /> {/* Add some space between */}
                            <GameReferral title="Single Player Games" gameDetails={topSinglePlayerGames} />
                            <Box height={32} /> {/* Add some space between */}
                            <GameReferral title="Indie Games" gameDetails={topIndieGames} />
                            <Box height={32} /> {/* Add some space between */}
                            <GameReferral title="Action Games" gameDetails={topActionGames} />
                            <Box height={32} /> {/* Add some space between */}
                            <GameReferral title="Adventure Games" gameDetails={topAdventureGames} />
                            <Box height={32} /> {/* Add some space between */}
                            <GameReferral title="Casual Games" gameDetails={topCasualGames} />
                        </Grid>
                        <Grid item xs={0.5} />
                    </Grid>
                </Box>
                <Footer />
            </header>
        </div>
    );
}

export default ExplorerPage;
