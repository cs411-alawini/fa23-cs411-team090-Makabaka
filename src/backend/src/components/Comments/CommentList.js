import React from "react";
import { Box } from "@mui/material";

import SingleComment from "./SingleComment";

function CommentList(props) {
    const { user, commitList, handleEdit, handleDelete } = props;
    
    return (
        <Box sx={{ mt: 4 }}>
            {commitList.map((commit) => (
                <SingleComment 
                    user={user}
                    key={commit.CommentID}
                    commitData={commit} 
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}
        </Box>
      );
};

export default CommentList;
