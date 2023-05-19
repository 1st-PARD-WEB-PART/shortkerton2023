import { BiChevronDown } from 'react-icons/bi';
import styled from 'styled-components';
import { useState } from "react";

const TextBox = styled.div`
    background : #FFFFFF;
    width : 400px;
    height : 100px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;
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
      <TextBox>
        <Text>궁그매</Text>
        <ArrowIcon onClick={toggleAccordion} />
      </TextBox>
      {isExpanded && (
        <TextBox>
          <Text>Content goes here</Text>
        </TextBox>
      )}
    </div>
  );
}
export default QuestionCard;