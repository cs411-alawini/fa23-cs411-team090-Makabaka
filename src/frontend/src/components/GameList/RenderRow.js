import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';

/**
 * Put `gameData` into table
 */
function RenderRow(props) {
    const { gameData } = props;

    return (
        <TableRow>
            <TableCell>
                <MuiLink component={Link} to={`/games/${gameData.QueryID}`} color="inherit" underline="none">
                    {gameData.QueryName}
                </MuiLink>
            </TableCell>
            <TableCell>
                {gameData.RecommendationCount}
            </TableCell>
            <TableCell>
                {gameData.ReleaseDate}
            </TableCell>
            <TableCell> {gameData.Genres} </TableCell>
        </TableRow>
    );
}

export default RenderRow;
