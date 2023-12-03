import { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

import AppBar from '../../components/AppBar'
import Footer from '../../components/Footer'
import GameListWithFilter from '../../components/GameListWithFilter'

const allTypes = ['SinglePlayer', 'Indie', 'Action', 'Adventure', 'Casual', 'Multiplayer', 'Strategy', 'Simulation', 'Other'];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function SearchPage(props) {
    const { user, handleLogout } = props;

    const query = useQuery().get('q');
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('RecommendationCount');

    // Need to check API is 0-index or 1-index
    const [page, setPage] = useState(1);

    const [maxPage, setMaxPage] = useState(1);

    const [gameData, setGameData] = useState([]);

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
        const fetchData = async () => {
            console.log(`${process.env.REACT_APP_API_URL}/api/games/search?q=${query}&page=${page}&sortField=${orderBy}&sortOrder=${order}&gameType=${gameType}`);

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/search?q=${query}&page=${page}&sortField=${orderBy}&sortOrder=${order}&gameType=${gameType}`);


            // console.log(order);
            // console.log(orderBy);
            // console.log(page);

            setMaxPage(response.data.maxPage); // Get the maxPage from the API response
            setGameData(response.data.data); // Get data from the API response
        };

        fetchData();
    }, [query, order, orderBy, page, gameType]);

    /*
    useEffect(() => {
        setGameData([
            {
              "restaurant_id": 1,
              "restaurant_name": "Johnson-King",
              "restaurant_address": "00972 Thompson Harbors Suite 967\nErikland, AR 25282",
              "restaurant_rating": 3.1,
              "restaurant_type": "India food"
            },
            {
              "restaurant_id": 2,
              "restaurant_name": "Soto, Gregory and Baker",
              "restaurant_address": "6281 Tracey Lake\nWest Kim, NJ 30115",
              "restaurant_rating": 3.1,
              "restaurant_type": "India food"
            },
            {
              "restaurant_id": 3,
              "restaurant_name": "Evans, Valentine and Williams",
              "restaurant_address": "8756 Chaney Bypass Apt. 837\nChenborough, IN 18708",
              "restaurant_rating": 2.6,
              "restaurant_type": "Thai food"
            },
            {
              "restaurant_id": 4,
              "restaurant_name": "Davis, Barr and Johnson",
              "restaurant_address": "768 Mann Gardens Suite 660\nBlackwellland, HI 52334",
              "restaurant_rating": 1.5,
              "restaurant_type": "Japanese food"
            },
            {
              "restaurant_id": 5,
              "restaurant_name": "Ferguson, Johnson and Ford",
              "restaurant_address": "2509 Chan Cove Apt. 106\nMiguelland, AL 16950",
              "restaurant_rating": 4.3,
              "restaurant_type": "Korean food"
            },
            {
              "restaurant_id": 6,
              "restaurant_name": "Williams, Rogers and Howe",
              "restaurant_address": "463 Melissa Prairie\nLake Dominiqueshire, IL 08829",
              "restaurant_rating": 4.3,
              "restaurant_type": "Japanese food"
            },
            {
              "restaurant_id": 7,
              "restaurant_name": "Baker, Cantrell and Phillips",
              "restaurant_address": "4216 Elliott Shore Apt. 107\nSouth Lisa, AR 78345",
              "restaurant_rating": 3.0,
              "restaurant_type": "Japanese food"
            },
            {
              "restaurant_id": 8,
              "restaurant_name": "Macdonald, West and Jacobs",
              "restaurant_address": "265 Mitchell Ridge\nPhilipfort, DC 59234",
              "restaurant_rating": 3.8,
              "restaurant_type": "Korean food"
            },
            {
              "restaurant_id": 9,
              "restaurant_name": "Cruz and Sons",
              "restaurant_address": "PSC 5863, Box 5741\nAPO AP 34829",
              "restaurant_rating": 4.8,
              "restaurant_type": "Mexican food"
            },
            {
              "restaurant_id": 10,
              "restaurant_name": "Guerrero, Macias and Reid",
              "restaurant_address": "606 Destiny Forks\nPort Rachel, NM 62459",
              "restaurant_rating": 1.8,
              "restaurant_type": "Thai food"
            }])
    }, []);
    // */

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, property) => {
        setPage(property);
    };

    return (
        <div className="SearchPage">
            <header className="SearchPage-header">
                <AppBar 
                    user={user}
                    handleLogout={handleLogout}
                />
                <Box sx={{ mt: 10 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={0.5} />
                        <Grid item xs={11}>
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
};

export default SearchPage;

