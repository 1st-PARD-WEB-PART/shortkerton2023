import { db } from "../firebase";
import { collection, getDoc, setDoc, doc, query, where, getDocs, serverTimestamp  } from "firebase/firestore";
import { v4 as uuid } from 'uuid';

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
    if(questionSnapshot.data()["creator-id"] !== userId){
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
    console.log({userId, questionId, answer})
    const answerId = uuid();
    const docRef = doc(db, "answer", answerId);
    const data = {
        answerIdField : answerId,
        questionIdField : questionId,
        userIdField : userId,
        answerField : answer,
        createdTimeField : serverTimestamp(),
    };
    await setDoc(docRef, data);
    return docRef;
}

const AddNewQuestion = async ({userId, question}) => {
    console.log({userId, question})
    const questionId = uuid();
    const docRef = doc(db, "question", questionId);
    const data = {
        questionId: questionId,
        creatorId: userId,
        question: question,
        createdTime: serverTimestamp(),
        isFavorited : false,
    }
    await setDoc(docRef, data);
    return docRef;
}

export {ReadQuestion, AddNewAnswer, AddNewQuestion, ReadAllAnswerOfQuestion, ReadAllMyQuestion, ReadAllAnswerOfOwnQuestion};