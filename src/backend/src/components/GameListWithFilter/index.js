
import { Grid } from '@mui/material';
import GameList from '../GameList';
import Filter from '../Filter';

function GameListWithFilter(props) {
    const { gameData, page, maxPage, order, orderBy, handleRequestSort, handleChangePage, allTypes, selectedTypes, handleTypeChange, handleResetSelection, handleSubmitSelection } = props;

    return (
        <Grid container spacing={2}>
            <Grid item xs={0.3}>
                <div />
            </Grid>
            <Grid item xs={8} >
                <GameList
                    gameData={gameData}
                    page={page}
                    maxPage={maxPage}
                    order={order}
                    orderBy={orderBy}
                    handleRequestSort={handleRequestSort}
                    handleChangePage={handleChangePage}
                />
            </Grid>
            <Grid item xs={3} >
                <Filter
                    allTypes={allTypes}
                    selectedTypes={selectedTypes}
                    handleTypeChange={handleTypeChange}
                    handleResetSelection={handleResetSelection}
                    handleSubmitSelection={handleSubmitSelection}
                />
            </Grid>
        </Grid>
    );
}

export default GameListWithFilter;
