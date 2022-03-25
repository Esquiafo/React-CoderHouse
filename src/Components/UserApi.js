
import {  initializeApp } from "firebase/app"
import { useState, useEffect } from 'react';
import {collection, getFirestore, query, getDocs } from 'firebase/firestore';


const app = initializeApp({
    apiKey: "AIzaSyCX4jT-67GWc46D1Q6RZqXmW6Cyzd2vgl0",
    authDomain: "artstation-c28e8.firebaseapp.com",
    projectId: "artstation-c28e8",
    storageBucket: "artstation-c28e8.appspot.com",
    messagingSenderId: "552661991680",
    appId: "1:552661991680:web:13d9ecc1f0b81b2a86b3e5"
});
const db = getFirestore();

const FireBaseApi = () =>{
const [data, setData] = useState();
useEffect(() => {
  const getUsers = async () =>{
      const arrEmp= [];
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q); 
      querySnapshot.forEach((doc) => {
        arrEmp.push({...doc.data(), id:doc.id}) 
      })
      setData(arrEmp)
  }
  getUsers();
},[]);

return data
}
export default FireBaseApi;

