import './GameDetailPage.css';

// import React, { useEffect, useState } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/AppBar'
import Comments from '../../components/Comments'
import Footer from '../../components/Footer'

import { Box, Grid, Paper} from '@mui/material';

import GameDetailPageHead from './GameDetailPageHead';
import GameDetailPageTabs from './GameDetailPageTabs';

function GameDetailPage(props) {
    const { user, handleLogout } = props;

    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [commits, setCommits] = useState([]);
    const [DLCs, setDLCs] = useState([]);
    const [gameGenre, setGameGenre] = useState([]);
    const [gamePlatform, setGamePlatform] = useState([]);
    const [developer, setDeveloper] = useState(null);
    const [relatedGame, setRelatedGame] = useState([]);
    const [updateComment, setUpdateComment] = useState(false);

    // fetch game detail data
    useEffect(() => {
        const fetchGame = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}`);
            setGame(response.data);
        };
        fetchGame();
  
        if (!game) {
            // Fetch the restaurant data if it doesn't exist
            fetchGame();
        }
    }, [id, game]);

    // fetch game data
    useEffect(() => {
        const fetchGameDLC = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}/dlc`);
            setDLCs(response.data);
        };
        const fetchGameGenre = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}/genres`);
            setGameGenre(response.data);
        };
        const fetchGamePlatform = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}/platform`);
            setGamePlatform(response.data);
        };
        const fetchDeveloper = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}/developer`);
            setDeveloper(response.data);
        };
        fetchGameDLC();
        fetchGameGenre();
        fetchGamePlatform();
        fetchDeveloper();
    }, [id]);
    
    useEffect(() => {
        const fetchRelatedGame = async () => {
            if (id && developer && developer.DeveloperID) {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/developer/${developer.DeveloperID}/games`);
                const filteredGames = response.data.filter(game => game.QueryID !== parseInt(id));
                setRelatedGame(filteredGames);
            }
        };
        fetchRelatedGame();
    }, [id, developer]);

    // fetch game commits data
    useEffect(() => {
        const fetchGameCommits = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}/comments`);
            setCommits(response.data);
        };
        fetchGameCommits();
        if (updateComment) {
            fetchGameCommits();
            setUpdateComment(false);
        }
    }, [id, updateComment]);


    /*
    function handleGoBack() {
      // Navigate back to the main page
      window.history.back();
    }
    */
    if (!game) {
        return <div>Loading...</div>;
    }
    /*
    if (!game) {
      // Render a loading spinner or message if the data is still loading
      return <div>Sorry, this game does not exist.</div>;
    }
    */

    return (
        <div>
            <AppBar 
                user={user}
                handleLogout={handleLogout}
            />
            <Box sx={{ mt: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1} />

                    <Grid item xs={10}>
                        <Box sx={{ mt: 3 }}>
                            <Paper sx={{ p: 3 }}>
                                <GameDetailPageHead user={user} detail={game} gameGenre={gameGenre} />
                            </Paper>
                        </Box>

                        <Paper sx={{ p: 3 }}>
                            <GameDetailPageTabs detail={game} DLCs={DLCs} gamePlatform={gamePlatform} relatedGame={relatedGame} />
                            <Comments 
                                user={user}
                                commitList={commits}
                                gameId={id}
                                setUpdateComment={setUpdateComment}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={1} />
                </Grid>
            </Box>
            <Footer />
        </div>
    );
}

export default GameDetailPage;
