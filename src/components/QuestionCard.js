import { BiChevronDown } from 'react-icons/bi';
import styled from 'styled-components';
import { useState } from "react";
import { Container } from '@mui/material';

const Text = styled.h4`

`;
const ArrowIcon = styled(BiChevronDown)`
    font-size: 24px;
    margin-left: 10px;
`;


const QuestionCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <Container>
        <Text>궁그매</Text>
        <ArrowIcon onClick={toggleAccordion} />
      </Container>
      {isExpanded && (
        <Container>
          <Text>Content goes here</Text>
        </Container>
      )}
    </div>
  );
}
export default QuestionCard;