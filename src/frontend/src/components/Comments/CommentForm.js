import React from "react";
import { Box, TextField, Button, Rating } from "@mui/material";

function CommentForm(props) {
    const { user, currentComment, setCurrentComment, handleSubmit, userRate, setUserRate } = props;

    if (!user) {
        return <p>Please login first before leave a comment.</p>
    }
    
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Rating
                name="gameType-rating"
                value={userRate}
                onChange={(event, newValue) => {
                    setUserRate(newValue);
                }}
            />
            <TextField
                fullWidth
                label="Add a comment"
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit Comment
            </Button>
        </Box>
    );
};

export default CommentForm;
