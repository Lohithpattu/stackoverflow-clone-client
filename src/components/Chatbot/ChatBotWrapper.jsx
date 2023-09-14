import React, { useState } from 'react'
import { BsFillChatFill } from 'react-icons/bs'
import './chatbotWrapper.css'
import GetOTPForm from './GetOTPForm'
import VerifyOTPForm from './VerifyOTP'
import Chatbot from './ChatBot'

const ChatBotWrapper = () => {
  const [isOtpFormVisible, setIsOtpFormVisible] = useState(false)
  const [isVerifyOtpFormVisible, setIsVerifyOtpFormVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState(null)
  const handleNext = () => {
    setIsOtpFormVisible(false)
    setIsVerifyOtpFormVisible(true)
  }
  const onOtpVerified = () => {
    setIsOtpFormVisible(false)
    setIsVerifyOtpFormVisible(false)
    setIsVerified(true)
  }
  
  return (
    <div className='chat-bot-wrapper'>
      {(!isOtpFormVisible && !isVerifyOtpFormVisible && !isVerified) && <button onClick={() => { setIsOtpFormVisible(true) }} className='icon-button'><BsFillChatFill className='icon' /></button>}
      {isOtpFormVisible && <GetOTPForm setEmail={setEmail} handleClose={() => setIsOtpFormVisible(false)} handleNext={handleNext} />}
      {(!isOtpFormVisible && isVerifyOtpFormVisible) && <VerifyOTPForm email={email} onOtpVerified={onOtpVerified} />}
      {isVerified && <Chatbot />}
    </div>
  )
}

export default ChatBotWrapper