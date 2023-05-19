import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReadQuestion } from "../services/DbService";

export default function AnswerQuestionPage(){
    const [questionData, setQuestionData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const { questionId } = useParams();
            const questionRef = await ReadQuestion({questionId: questionId});
            const data = questionRef.data();
            console.log(data);
            setQuestionData(data);
        } 
        
        fetchData().catch(console.error);
    }, [])

    return <>
        {questionData.question}
    </>
}

