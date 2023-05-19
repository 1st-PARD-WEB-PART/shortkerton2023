import styled from 'styled-components';
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const PartDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const CollectWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const Collect = styled.div`
`;

const H1 = styled.div`
  display: inline;
  font-size: 20px;
`;

const H2 = styled.div`
  display: inline;
  font-size: 10px;
`;

const Hr = styled.hr`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-items: center;
  margin-top: 10px;
  color: #5262f5;
`;

const QuestionList = () => {
    const [part, setPart] = useState([
        {
            id: 1,
            q: "Q. 인사말?",
            answer: [
                { a: "안녕하세요", name: "손흥민" },
                { a: "헬로", name: "황희찬" }
            ]
        },
        {
            id: 2,
            q: "Q. 가장 좋아하는 음식이 뭐야?",
            answer: [
                { a: "치킨", name: "김민재" },
                { a: "피자", name: "황인범" }
            ]
        }
    ]);

    return (
        <PartDiv>
            <CollectWrapper>
                <Collect>
                    <H1>"답변이 도착했어요!"</H1>
                    <H2>질문 클릭시 답변 확인이 가능합니다.</H2>
                    <br></br><br></br>
                    {part.map((item) => (
                        <Accordion key={item.id} sx={{ width: '400px', backgroundColor: '#818181' }}>
                            <AccordionSummary
                                aria-controls={`panel${item.id}-content`}
                                id={`panel${item.id}-header`}
                            >
                                <Typography>{item.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    {item.answer.map((answer, index) => (
                                        <div key={index}>
                                            <Typography>"{answer.name}"님의 답변</Typography>
                                            <Typography>{answer.a}</Typography>
                                            <br></br>
                                        </div>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Collect>
                <Collect>
                    <br></br><br></br>
                    <H1>"답변 모아보기"</H1>
                    <H2>최대 10개 보관 가능</H2>
                    <Hr /><br></br>
                    {part.map((item) => (
                        <Accordion key={item.id} sx={{ width: '400px' }}>
                            <AccordionSummary
                                aria-controls={`panel${item.id}-content`}
                                id={`panel${item.id}-header`}
                            >
                                <Typography>{item.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    {item.answer.map((answer, index) => (
                                        <div key={index}>
                                            <Typography>"{answer.name}"님의 답변</Typography>
                                            <Typography>{answer.a}</Typography>
                                            <br></br>
                                        </div>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Collect>
            </CollectWrapper>
        </PartDiv>
    );
};

export default QuestionList;
