import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { useState } from "react";
import { List, ListItem, IconButton, ListItemText } from '@mui/material';
import { GoComment } from 'react-icons/go';
// import { IoEllipse } from "react-icons/io";

const PartDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height: 100%;
    justify-items: center;
    width: 1279px;
    `;

const Collect = styled.div`
    margin-left: 440px;
`

const H1 = styled.div`
    display: inline;
    font-size: 20px;
`
const H2 = styled.div`
    display: inline;
    font-size: 10px;
`

const Hr = styled.hr`
    width: 300px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-items: center;
    margin-top: 10px;
    margin-right: 700px;
    color: #5262f5;
`

const Box = styled.div`
    width: 30px;
    height: 30px;
    background-color: #000000;
`
const Check = styled.svg`
    color: #5262f5;
    //d="M1 1L5 5L9 1"
`

const StyledPath = styled.path`
  stroke: white;
`;

const QuestionList = () => {
    const [part, setPart] = useState([
        {
            id: 1,
            q: "Q. 가장 좋아하는 치킨은??",
            a: "갓튀긴 후라이드",
            selected: "false",
        },
        {
            id: 2,
            q: "Q. 가장 좋아하는 음식이 뭐야??",
            a: "치킨",
            selected: "false"

        },
    ]);

    const handleButtonClick = (id) => {
        setPart(prevPart => prevPart.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    selected: true,
                };
            } else {
                return {
                    ...p,
                    selected: false,
                }
            }
        }));
    }


    // const [checked, setChecked] = useState(false);

    return (
        <PartDiv>
            <Collect>
                {/* <H1>“답변이 도착했어요!”</H1>
                <H2>질문 클릭시 답변 확인이 가능합니다.</H2>
                <br></br> */}
                <H1>"답변 모아보기"</H1>
                <H2>질문 클릭시 답변 확인이 가능합니다.</H2>

                <Hr />
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {part.map((item) => (
                        <ListItem
                            key={item.id}
                            disableGutters
                            secondaryAction={
                                <IconButton aria-label="comment">
                                    <GoComment />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={item.q} />
                            <Box>
                                <Check width="20px" height="20px" viewBox="0 0 20 20" onClick={() => handleButtonClick(item.id)}
                                >
                                    {item.selected ? (
                                        <>
                                            <ListItemText primary={item.a} />
                                            <StyledPath d="M1 1L5 5L9 1" />
                                        </>
                                    ) : (
                                        <StyledPath d="M1 6L5 1L9 6" />
                                    )}
                                </Check>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Collect>
        </PartDiv>
    );
};

export default QuestionList;