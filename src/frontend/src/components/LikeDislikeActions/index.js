import { useState, useEffect } from "react";
import axios from "axios";

import { Box, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const LikeDislikeActions = ({ initialScore, commentId, gameId }) => {
    const [score, setScore] = useState(initialScore);
    const [userAction, setUserAction] = useState(null);

    useEffect(() => {
        const rateComment = async (action) => {
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/game/${gameId}/rate-comment/${commentId}`, { action });
            } catch (error) {
                console.error(error);
            }
        };
    
        if (userAction === "like") {
            rateComment("like");
        }
        if (userAction === "dislike") {
            rateComment("dislike");
        }
    }, [userAction, commentId, gameId]);

    const handleLike = () => {
        if (userAction === "like") {
            setScore(score - 1);
            setUserAction(null);
        } else {
            setScore(userAction === "dislike" ? score + 2 : score + 1);
            setUserAction("like");
        }
    };

    const handleDislike = () => {
        if (userAction === "dislike") {
            setScore(score + 1);
            setUserAction(null);
        } else {
            setScore(userAction === "like" ? score - 2 : score - 1);
            setUserAction("dislike");
        }
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
                {score}
            </Typography>
            <IconButton size="small" onClick={handleLike}>
                <ThumbUpIcon fontSize="small" color={userAction === "like" ? "primary" : "inherit"} />
            </IconButton>
            <IconButton size="small" onClick={handleDislike}>
                <ThumbDownIcon fontSize="small" color={userAction === "dislike" ? "error" : "inherit"} />
            </IconButton>
        </Box>
    );
};

export default LikeDislikeActions;
