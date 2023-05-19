import { db } from "../firebase";
import { collection, getDoc, setDoc, doc, query, where, getDocs  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const questionCollection = collection(db, "message");
const answerCollection = collection(db, "answer");

const ReadQuestion = async ({questionId}) => {
    const questionRef = doc(db, questionCollection, questionId);
    return await getDoc(questionRef);
}

const ReadAllQuestion = async ({userId}) => {
    const q = query(questionCollection, where("creator-id", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.forEach((snap) => snap.data());
}

const AddNewAnswer = async ({userId, questionId, answer}) => {
    const answerId = uuidv4();
    const docRef = doc(db, answerCollection, answerId);
    const answerData = {
        "answer-id" : answerId,
        "question-id" : questionId,
        "user-id" : userId,
        "answer" : answer,
    }
    await setDoc(docRef, answerData);
    return docRef;
}

const AddNewQuestion = async ({userId, messageInfo}) => {
    const questionId = uuidv4();
    const docRef = doc(db, questionCollection, questionId);
    const questionData = {
        "question-id": questionId,
        "creator-id": userId,
        "question": messageInfo.message,
    }
    await setDoc(docRef, questionData);
    return docRef;
}

export {ReadQuestion, AddNewAnswer, AddNewQuestion, ReadAllQuestion};