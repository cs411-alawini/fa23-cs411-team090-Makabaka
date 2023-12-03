import { TableCell, TableRow, TableSortLabel } from '@mui/material';

function GameListHeader(props) {
    const { order, orderBy, onRequestSort } = props;

    /**
     * called when user click any sort buttom
     * 
     * @param {*} property 
     */
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableRow>
            <TableCell>
                Name
                <TableSortLabel
                    active={orderBy === 'QueryName'}
                    direction={orderBy === 'QueryName' ? order : 'asc'}
                    onClick={createSortHandler('QueryName')}
                />
            </TableCell>
            <TableCell>
                Recommendation Count
                <TableSortLabel
                    active={orderBy === 'RecommendationCount'}
                    direction={orderBy === 'RecommendationCount' ? order : 'asc'}
                    onClick={createSortHandler('RecommendationCount')}
                />
            </TableCell>
            <TableCell>
                Release Date
            </TableCell>
            <TableCell>
                Genrel
            </TableCell>
        </TableRow>
    );
}

export default GameListHeader;
