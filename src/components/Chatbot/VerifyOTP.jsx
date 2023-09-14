import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import loadingIcon from '../../assets/loading-icon.svg'
import { baseUrl } from '../../api'
import {string,object} from 'yup'
const VerifyOTPForm = ({email,onOtpVerified}) => {
    const [isLoading, setIsLoading] = useState(false)
    const validationSchema = object({
        otp: string().length(6,'otp should be only 6 digit.').required('email is required.')
    })
    const handleSubmit = async(values) => {
        setIsLoading(true)
        axios.post(baseUrl+'/user/verifyOTP',{OTP:values.otp,email})
        .then(()=>{
            onOtpVerified()
        })
        .catch((error)=>{
            console.log(error)
            alert(error.message)
        })
        .finally(()=>setIsLoading(false))
    }
    return (
        <Formik initialValues={{ otp: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <div className='form-container'>
                {
                    !isLoading && <Form className='form'>
                        <div>
                            <p>Check spam folder for email.</p>
                            <p>Please wait some time before send otp again.</p>
                        </div>
                        <div className='input-container'>
                            <label htmlFor="otp">Enter 6 digit OTP</label>
                            <Field name="otp" />
                            <ErrorMessage className='error-container' name='otp' component={'div'} />
                        </div>
                        <button className='submit-button'>Verify</button>
                    </Form>
                }
                {
                    isLoading && <img src={loadingIcon} alt="loading icon" />
                }
            </div>
        </Formik>
    )
}

export default VerifyOTPForm