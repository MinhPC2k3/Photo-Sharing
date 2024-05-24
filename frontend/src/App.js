import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/Login";
import AppLayout from "./component/layout/layout";
import Profile from "./pages/Profile";
import { useState } from 'react';
import userModal from './model/user'
export default function App() {
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [userID,setUserID]= useState('')
  const [email,setEmail] = useState('');
  const [token,setToken] =useState('')
  const  setLoginData =(loginData) =>{
    setUserName(loginData)
  }
  const  setLoginProfilePicture =(imgData) =>{
    setProfilePicture(imgData)
  }
  const  setLoginPhoneNum =(loginPhoneNum) =>{
    setphoneNumber(loginPhoneNum)
  }
  const  setLoginUserID =(loginUserID) =>{
    setUserID(loginUserID)
  }
  const  setLoginEmail =(loginEmail) =>{
    setEmail(loginEmail)
  }
  const  setLoginToken =(loginToken) =>{
    setToken(loginToken)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LoginScreen userName={userName} setLoginData={setLoginData} setLoginProfilePicture={setLoginProfilePicture} setLoginPhoneNum={setLoginPhoneNum} setLoginUserID={setLoginUserID} setLoginEmail={setLoginEmail} setLoginToken={setLoginToken}/>} />
        <Route path="/login" element={<LoginScreen userName={userName} setLoginData={setLoginData} setLoginProfilePicture={setLoginProfilePicture} setLoginPhoneNum={setLoginPhoneNum} setLoginUserID={setLoginUserID} setLoginEmail={setLoginEmail} setLoginToken={setLoginToken}/>} />
        <Route path="/home" element={<AppLayout userName={userName} setLoginData={setLoginData}  profilePicture={profilePicture} phoneNumber={phoneNumber} userID={userID} email={email} token={token}/>} />
        <Route path="/profile" element={<Profile userName={userName} setLoginData={setLoginData} phoneNumber={phoneNumber} userID={userID} profilePicture={profilePicture} email={email} token={token}/>} />
      </Routes>
    </BrowserRouter>
  );
}
