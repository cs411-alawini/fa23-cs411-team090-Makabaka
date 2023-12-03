import './Homepage.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Grid } from '@mui/material';

import AppBar from '../../components/AppBar'
import GameListWithFilter from '../../components/GameListWithFilter'
import GameReferral from '../../components/GameReferral'
import Footer from '../../components/Footer'

const allTypes = ['SinglePlayer', 'Indie', 'Action', 'Adventure', 'Casual', 'Multiplayer', 'Strategy', 'Simulation', 'Other'];


function HomePage(props) {
    const { user, handleLogout } = props;

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('RecommendationCount');

    // Need to check API is 0-index or 1-index
    const [page, setPage] = useState(1);

    const [maxPage, setMaxPage] = useState(1);

    const [gameData, setGameData] = useState([]);

    const [gameDetails, setGameDetails] = useState([]);

    const [gameType, setGameType] = useState('all');

    // initialize selectedTypes state using allTypes array
    const [selectedTypes, setSelectedTypes] = useState(
        allTypes.reduce((acc, type) => {
            acc[type] = true;
            return acc;
        }, {})
    );

    // const [submittedTypes, setSubmittedTypes] = useState(selectedTypes);
    
    // update selectedTypes state on type change
    const handleTypeChange = (typeName) => {
        setSelectedTypes((prevState) => ({
            ...prevState,
            [typeName]: !prevState[typeName],
        }));
    };
    
    // reset selectedTypes state to all types
    const handleResetSelection = () => {
        setSelectedTypes(
            Object.fromEntries(allTypes.map((type) => [type, true]))
        );
        setGameType('all');
    };

    // update selectedTypesString and page on submit
    const handleSubmitSelection = () => {
        setPage(1);
        const selectedTypesArray = Object.entries(selectedTypes)
            .filter(([_, isSelected]) => isSelected)
            .map(([typeName, _]) => typeName);
        
        setGameType(selectedTypesArray
            .map((typeName, index) => `${encodeURIComponent(typeName)}`)
            .join(','));
    };

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/games/topgame`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGameDetails(data); // update the state
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        };

        fetchGameDetails();
    }, []);

    // fetch game data of current page, and number of total page
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/list?page=${page}&sortField=${orderBy}&sortOrder=${order}&gameType=${gameType}`);

            // console.log(order);
            // console.log(orderBy);
            // console.log(page);
            // console.log(`${process.env.REACT_APP_API_URL}/api/games/list?page=${page}&sortField=${orderBy}&sortOrder=${order}&gameType=${gameType}`);

            setMaxPage(response.data.maxPage); // Get the maxPage from the API response
            setGameData(response.data.data); // Get data from the API response
        };

        fetchData();
    }, [order, orderBy, page, gameType]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, property) => {
        setPage(property);
    };

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
                            <GameReferral gameDetails={gameDetails} />
                            <Box height={32} /> {/* Add some space between */}
                            <GameListWithFilter
                                gameData={gameData}
                                page={page}
                                setPage={setPage}
                                maxPage={maxPage}
                                order={order}
                                orderBy={orderBy}
                                handleRequestSort={handleRequestSort}
                                handleChangePage={handleChangePage}
                                allTypes={allTypes}
                                selectedTypes={selectedTypes}
                                handleTypeChange={handleTypeChange}
                                handleResetSelection={handleResetSelection}
                                handleSubmitSelection={handleSubmitSelection}
                            />
                        </Grid>
                        <Grid item xs={0.5} />
                    </Grid>
                </Box>
                <Footer />
            </header>
        </div>
    );
}

export default HomePage;
