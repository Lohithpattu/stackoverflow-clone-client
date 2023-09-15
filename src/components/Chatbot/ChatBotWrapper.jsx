import React, { useState } from 'react'
import { BsFillChatFill } from 'react-icons/bs'
import './chatbotWrapper.css'
import VerifyOTPForm from './VerifyOTP'
import Chatbot from './ChatBot'

import { useDispatch, useSelector } from 'react-redux'
import GetOtpWidget from './GetOtpWidget'

const ChatBotWrapper = () => {
  const [isVerifyOtpFormVisible, setIsVerifyOtpFormVisible] = useState(false);
  const loggedInUser = useSelector((state) => state.currentUserReducer?.result) || null;
  const [isOtpWidgetVisible, setIsOtpWidgetVisible] = useState(false)
  const isVerified = useSelector(state => state.chatbotReducer.isVerified)
  const dispatch = useDispatch();

  const handleNext = () => {
    setIsOtpWidgetVisible(false)
    setIsVerifyOtpFormVisible(true)
  }

  const onOtpVerified = () => {
    setIsOtpWidgetVisible(false)
    setIsVerifyOtpFormVisible(false)
    dispatch({ type: 'VERIFIED' })
    window.botpressWebChat.onEvent((event) => {
      if (event.type === 'LIFECYCLE.LOADED') {
        window.botpressWebChat.sendEvent(window.botpressWebChat.sendEvent({ type: 'show' }))
      }
    }, ['LIFECYCLE.LOADED'])
  }

  const handleIconClick = () => {
    if (!loggedInUser) {
      alert('You must be logged in to ask questions. to Chatbot.')
      return
    }
    setIsOtpWidgetVisible(true)
  }


  return (
    <div className='chat-bot-wrapper'>
      {(!isOtpWidgetVisible && !isVerifyOtpFormVisible && !isVerified) && <button onClick={handleIconClick} className='icon-button'><BsFillChatFill className='icon' /></button>}
      {(isOtpWidgetVisible && loggedInUser) && <GetOtpWidget handleClose={() => setIsOtpWidgetVisible(false)} handleNext={handleNext} />}
      {(!isOtpWidgetVisible && isVerifyOtpFormVisible && loggedInUser) && <VerifyOTPForm email={loggedInUser.email} onOtpVerified={onOtpVerified} />}
      {(isVerified && loggedInUser) && <Chatbot />}
    </div>
  )
}

export default ChatBotWrapper