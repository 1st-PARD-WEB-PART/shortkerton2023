import styled from 'styled-components';
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ReadAllAnswerOfOwnQuestion, ReadAllAnswerOfQuestion, GetUserDisplayNameByUserId } from '../services/DbService';

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

const QuestionList = ({ questionList, userId }) => {
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setLoading(true);
        Promise.all(
            questionList.map((item) =>
                ReadAllAnswerOfOwnQuestion({ userId: userId, questionId: item.questionId })
            )
        )
            .then((allAnswers) => {
                setAnswers(allAnswers);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [questionList, userId]);

    return (
        <PartDiv>
            <CollectWrapper>
                <Collect>
                    <br></br><br></br>
                    <H1>"답변 모아보기"</H1>
                    {/* <H2>최대 10개 보관 가능</H2> */}
                    <Hr /><br></br>
                    {questionList.map((item, index) => (
                        <Accordion key={item.questionId} sx={{ width: '400px' }}>
                            <AccordionSummary
                                aria-controls={`panel${item.questionId}-content`}
                                id={`panel${item.questionId}-header`}

                            >
                                <Typography>{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    loading || answers[index] == null
                                        ? <div>loading...</div>
                                        : <div>
                                            {answers[index].map((answer, answerIndex) => (
                                                <div key={answerIndex}>
                                                    <Typography>"{answer.name ?? "익명"}"님의 답변</Typography>
                                                    <Typography>{answer.answer}</Typography>
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                }
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Collect>
            </CollectWrapper>
        </PartDiv>
    );
};

export default QuestionList;
