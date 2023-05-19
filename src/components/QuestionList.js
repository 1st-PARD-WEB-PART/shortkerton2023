import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { useState } from "react";
import { List, ListItem, IconButton, ListItemText } from '@mui/material';
import { GoComment } from 'react-icons/go';
// import CommentIcon from '@mui/icons-material/Comment';

const QuestionList = () => {
    const list = [
        {
            id: 1,
            value: "화날 때 어떻게 대처해??",
        },
        {
            id: 2,
            value: "가장 좋아하는 음식이 뭐야??",
        },
    ];

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {list.map((item) => (
                <ListItem
                    key={item.id}
                    disableGutters
                    secondaryAction={
                        <IconButton aria-label="comment">
                            <GoComment/>
                        </IconButton>
                    }
                >
                    <ListItemText primary={item.value} />
                </ListItem>
            ))}
        </List>
    );
};

export default QuestionList;
