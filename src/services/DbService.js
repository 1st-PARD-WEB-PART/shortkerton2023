import { db } from "../firebase";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const messageCollection = collection(db, "message");
const answerCollection = collection(db, "answer");

const ReadQuestion = async ({questionId}) => {
    const questionRef = doc(db, messageCollection, questionId);
    return await getDoc(questionRef);
}

const AddNewAnswer = async ({userId, questionId, answer}) => {
    const answerId = uuidv4();
    const docRef = doc(db, answerCollection, answerId);
    const answerData = {
        "answer-id" : answerId,
        "question-id" : questionId,
        "answer" : answer,
    }
    await setDoc(docRef, answerData);
    return docRef;
}

const AddNewQuestion = async ({userId, messageInfo}) => {
    const questionId = uuidv4();
    const docRef = doc(db, messageCollection, questionId);
    const questionData = {
        "question-id": questionId,
        "creator-id": userId,
        "question": messageInfo.message,
    }
    await setDoc(docRef, questionData);
    return docRef;
}

export {ReadQuestion, AddNewAnswer, AddNewQuestion};