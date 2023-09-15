import axios from 'axios';
import React, { useState } from 'react'
import {  useSelector } from 'react-redux';
import { baseUrl } from '../../api';
import loadingIcon from '../../assets/loading-icon.svg';
import { AiOutlineClose } from 'react-icons/ai'
import './getOtpWidget.css'
const GetOtpWidget = ({ handleNext, handleClose }) => {
    const loggedInUser = useSelector((state) => state.currentUserReducer?.result) || null;
    const [isOtpSending, setIsOtpSending] = useState(false)
    const getOtp = async () => {
        if (!loggedInUser) {
            return alert('You must be logged in to ask questions to chatbot.');
        }
        setIsOtpSending(true)
        try {
            await axios.post(baseUrl + '/user/getOTP', { email: loggedInUser.email })
            handleNext();
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
        setIsOtpSending(false);
    }
    return (
        <div className='wrapper'>
            <div><AiOutlineClose onClick={handleClose} className='close-icon' /></div>
            <p>Plese verify before ask any Question to Chatbot.</p>
            <p>We'll send a OTP to {loggedInUser.email}</p>
            {!isOtpSending && <button onClick={getOtp} className='get-otp-button'>Get OTP</button>}
            {
                isOtpSending && <div className='loading-container'><img className='loading-icon' src={loadingIcon} alt='loading-icon' /> Sending...</div>
            }
        </div>
    )
}

export default GetOtpWidget