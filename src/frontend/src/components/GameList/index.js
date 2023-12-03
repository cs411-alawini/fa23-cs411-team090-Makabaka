/**
* @description: List (Table) of game by using `data`
*/

// GameList component
import { Stack, Table, TableHead, TableBody, TableContainer, Box, Pagination } from '@mui/material';

import GameListHeader from './GameListHeader';
import RenderRow from './RenderRow';

function GameList(props) {
    const { gameData, page, maxPage, order, orderBy, handleRequestSort, handleChangePage } = props;

    // Determine if there are search results, if not then return a message
    if (gameData.length === 0) {
        return (
            <Box>
                <h2>No results found.</h2>
                <p>Sorry, we couldn't find any results.</p>
            </Box>
        );
    }

    return (
        <Stack spacing={2}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <GameListHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    </TableHead>

                    <TableBody>
                        {gameData
                            .map((item) => <RenderRow key={`gameRow-${item.QueryID}`} gameData={item} />)}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center">
                <Pagination count={maxPage} page={page} onChange={handleChangePage} />
            </Box>
        </Stack>
    );
}

export default GameList;
