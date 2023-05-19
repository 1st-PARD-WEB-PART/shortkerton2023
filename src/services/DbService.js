import { db } from "../firebase";
import { collection, getDoc, setDoc, doc, query, where, getDocs, serverTimestamp  } from "firebase/firestore";
import { v4 as uuid } from 'uuid';

const questionCollection = collection(db, "question");
const answerCollection = collection(db, "answer");
const userCollection = collection(db, "user");

const SendQuery = async ({q}) => {
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    return querySnapshot.docs.map((snap) => snap.data());
}

const ReadQuestion = async ({questionId}) => {
    const questionRef = doc(db, "question", questionId);
    return await getDoc(questionRef);
}

const ReadAllMyQuestion = async ({userId}) => {
    console.log("userId: " + userId);
    const q = query(questionCollection, where("creatorId", "==", userId));
    return await SendQuery({q: q});
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
    return await SendQuery({q: q});
}

const ReadMyAnswerOfQuestion = async ({userId, questionId}) => {
    const q = query(answerCollection, where("questionId", "==", questionId), where("userId", "==", userId));
    const foundedAnswer = SendQuery({q: q});
    return foundedAnswer.length > 0 ? (await foundedAnswer).at(0) : null;
}

const ReadUserByUid = async ({userId}) => {
    const docRef = doc(db, "user", userId);
    const userSnapshot = await getDoc(docRef);
    return userSnapshot;
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
    const userSnapshot = (await ReadUserByUid({userId: user.uid}));
    if(userSnapshot.exists){
        console.log("user is already saved in db");
        return;
    } 
    const docRef = doc(db, "user", user.uid);
    const data = {
        userId: user.uid,
        name: user.displayName,
        registeredTime: serverTimestamp(),
    }
    await setDoc(docRef, data);
    console.log(user + " is added into db");
    return docRef;
}

const GetUserDisplayNameByUserId = async ({userId}) => {
    const userSnapshot = await ReadUserByUid({userId: userId});
    const userData = userSnapshot.data();
    return userData == null ? null : userData.name;
}

const DidAnswer = async ({userId, questionId}) => {
    const foundedAnswer = await ReadMyAnswerOfQuestion({userId: userId, questionId: questionId});
    return foundedAnswer.length > 0;
}

export {GetUserDisplayNameByUserId, DidAnswer, AddNewUser, AddNewAnswerAsNotUser, ReadQuestion, AddNewAnswer, AddNewQuestion, ReadMyAnswerOfQuestion as ReadAllAnswerOfQuestion, ReadAllMyQuestion, ReadAllAnswerOfMyQuestion as ReadAllAnswerOfOwnQuestion};