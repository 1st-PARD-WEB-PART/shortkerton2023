import TextField from "../components/TextField";
import styled from 'styled-components';

const H1 = styled.div`
    color : #FFFFFF;
`


function HomePage() {

    return (
        <div>
            <H1>질문을 입력하시오</H1>
            <TextField />
            <H1>답변을 입력하시오</H1>
            <TextField />
        </div>
    );
}

export default HomePage;

