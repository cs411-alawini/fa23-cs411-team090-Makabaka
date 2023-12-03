import React, { useState } from 'react';
import { Grid, Typography, Avatar, Rating, Box, Card, CardContent, Paper, CardActions, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SingleComment(props) {
    const { user, commitData, handleEdit, handleDelete } = props;
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(commitData.CommentText);

    const isCurrentUser = user && commitData.UserID === user.UserID;

    const handleSave = () => {
        handleEdit(commitData.CommentID, editedComment);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedComment(commitData.CommentText);
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };


    return (
        <Card sx={{ mb: 2, width: '100%' }} >
            <CardContent>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item>
                        <Paper elevation={3} sx={{ borderRadius: '50%' }}>
                            <Avatar alt="Default" src={"/static/images/avatar/Default.jpeg"} />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1">
                            {commitData.UserName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Rating
                                name={`game-${commitData.CommentID}-rating`}
                                value={commitData.Rating}
                                precision={0.1}
                                readOnly
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                {formatDate(commitData.CommentDate)}
                            </Typography>
                        </Box>
                        {isEditing ? (
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                            </Box>
                        ) : (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {commitData.CommentText}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                {isEditing ? (
                    <>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    isCurrentUser && ( // only show the edit and delete buttons if the current user is the author of the comment
                        <>
                            <IconButton onClick={() => setIsEditing(true)} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(commitData.CommentID)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )
                )}
            </CardActions>
        </Card>
    );
}

export default SingleComment;
