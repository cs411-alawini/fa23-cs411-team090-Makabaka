import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function GameReferralCard(props) {
    const { gameData } = props;
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    if (!gameData) {
        return (
            <Card sx={{ maxWidth: 345 }}>
                <Skeleton variant="rounded" height={194} />
                <Skeleton variant="rounded" height={68} />
                <Skeleton variant="rounded" height={48} />
                <Box display="flex" alignItems="center" gap={1} mb={1} >
                    <Skeleton variant="rounded" width={50} height={30} />
                    <Skeleton variant="rounded" width={100} height={30} />
                </Box>
            </Card>
        );
    }
    
    const handleCardClick = () => {
        navigate(`/games/${gameData.QueryID}`);
    };
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }} key={gameData.QueryID}>
            <CardMedia
                component="img"
                height="194"
                image={gameData.HeaderImage}
                alt={gameData.QueryName}
                onClick={handleCardClick}
            />
            <CardHeader
                title={gameData.QueryName}
                subheader={!expanded && (gameData.IsFree ? 'FREE' : `Price: ${gameData.PriceCurrency} ${gameData.PriceFinal}`)}
                onClick={handleCardClick}
            />
            <CardContent>
                {!expanded && (
                    <Typography variant="body2" color="text.secondary">
                        Release Date: {gameData.ReleaseDate}
                    </Typography>
                )}
                {expanded && (
                    <Typography variant="body2" color="text.secondary">
                        {gameData.DetailedDescrip}
                    </Typography>
                )}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default GameReferralCard;
