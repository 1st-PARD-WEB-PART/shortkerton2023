import { db } from "../firebase";
import { collection, getDoc, setDoc, doc, query, where, getDocs, serverTimestamp  } from "firebase/firestore";
import { v4 as uuid } from 'uuid';

const questionCollection = collection(db, "message");
const answerCollection = collection(db, "answer");
const userCollection = collection(db, "user");

const SendQuery = async ({q}) => {
    console.log(q);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((snap) => snap.data());
}

const ReadQuestion = async ({questionId}) => {
    console.log("got: " + questionId);
    const questionRef = doc(db, "question", questionId);
    return await getDoc(questionRef);
}

const ReadAllMyQuestion = async ({userId}) => {
    const q = query(questionCollection, where("creatorId", "==", userId));
    return SendQuery({q: q});
}

const ReadAllAnswerOfMyQuestion = async ({userId, questionId}) => {
    const questionSnapshot = await ReadQuestion({questionId});
    if(!questionSnapshot.exists()){
        return null;
    }
    if(questionSnapshot.data()["creatorId"] !== userId){
        console.log("user does not have a permission to get all answers");
        return await ReadMyAnswerOfQuestion({userId, questionId});
    }
    const q = query(answerCollection, where("questionId", "==", questionId));
    return SendQuery({q: q});
}

const ReadMyAnswerOfQuestion = async ({userId, questionId}) => {
    const q = query(answerCollection, where("questionId", "==", questionId), where("userId", "==", userId));
    return SendQuery({q: q});
}

const ReadUserByUid = async ({userId}) => {
    const q = query(userCollection, where("userId", "==", userId));
    return SendQuery({q: q});
}

const AddNewAnswerAsNotUser = async ({userName, questionId, answer}) => {
    const answerId = uuid();
    const docRef = doc(db, "answer", answerId);
    const data = {
        answerId : answerId,
        questionId : questionId,
        userName : userName,
        answer : answer,
        createdTime : serverTimestamp(),
    };
    await setDoc(docRef, data);
    return docRef;
}

const AddNewAnswer = async ({userId, questionId, answer}) => {
    const answerId = uuid();
    const docRef = doc(db, "answer", answerId);
    const data = {
        answerId : answerId,
        questionId : questionId,
        userId : userId,
        answer : answer,
        createdTime : serverTimestamp(),
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

const AddNewUser = async ({user}) => {
    console.log({user})
    const foundUser = (await ReadUserByUid({userId: user.uid}));
    console.log("foundUser : " + foundUser + " type : " + typeof(foundUser));
    if(foundUser.length != 0){
        console.log("user is already saved in db");
        return;
    } 
    console.log("user id: " + user.uid);
    const docRef = doc(db, "user", user.uid);
    const data = {
        userId: user.uid,
        name: user.name,
        registeredTime: serverTimestamp(),
    }
    await setDoc(docRef, data);
    console.log(user + " is added into db");
    return docRef;
}

const DidAnswer = async ({userId, questionId}) => {
    const foundedAnswer = await ReadMyAnswerOfQuestion({userId: userId, questionId: questionId});
    return foundedAnswer.length > 0;
}

export {DidAnswer, AddNewUser, AddNewAnswerAsNotUser, ReadQuestion, AddNewAnswer, AddNewQuestion, ReadMyAnswerOfQuestion as ReadAllAnswerOfQuestion, ReadAllMyQuestion, ReadAllAnswerOfMyQuestion as ReadAllAnswerOfOwnQuestion};