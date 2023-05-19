import { db } from "../firebase";
import { collection, getDoc, setDoc, doc, query, where, getDocs, serverTimestamp  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const questionCollection = collection(db, "message");
const answerCollection = collection(db, "answer");

const SendQuery = async ({q}) => {
    const querySnapshot = await getDocs(q);
    return querySnapshot.forEach((snap) => snap.data());
}

const ReadQuestion = async ({questionId}) => {
    const questionRef = doc(db, questionCollection, questionId);
    return await getDoc(questionRef);
}

const ReadAllMyQuestion = async ({userId}) => {
    const q = query(questionCollection, where("creator-id", "==", userId));
    return SendQuery(q);
}

const ReadAllAnswerOfOwnQuestion = async ({userId, questionId}) => {
    const questionSnapshot = await ReadQuestion({questionId});
    if(!questionSnapshot.exists()){
        return null;
    }
    if(questionSnapshot.data()["creator-id"] != userId){
        console.log("user does not have a permission to get all answers");
        return await ReadAllAnswerOfQuestion({userId, questionId});
    }
    const q = query(answerCollection, where("qeustion_id", "==", questionId));
    return SendQuery(q);
}

const ReadAllAnswerOfQuestion = async ({userId, questionId}) => {
    const q = query(answerCollection, where("qeustion_id", "==", questionId), where("user-id", "==", userId));
    return SendQuery(q);
}

const AddNewAnswer = async ({userId, questionId, answer}) => {
    const answerId = uuidv4();
    const docRef = doc(db, answerCollection, answerId);
    const answerData = {
        "answer-id" : answerId,
        "question-id" : questionId,
        "user-id" : userId,
        "answer" : answer,
        "created-time" : serverTimestamp(),
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
        "created-time": serverTimestamp(),
        "is-favorited" : false,
    }
    await setDoc(docRef, questionData);
    return docRef;
}

export {ReadQuestion, AddNewAnswer, AddNewQuestion, ReadAllAnswerOfQuestion, ReadAllMyQuestion, ReadAllAnswerOfOwnQuestion};