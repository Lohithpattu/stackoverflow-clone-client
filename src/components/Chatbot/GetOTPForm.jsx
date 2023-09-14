import React, { useState } from 'react'
import { string, object } from 'yup'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import './getOTPForm.css'
import { AiOutlineClose } from 'react-icons/ai'
import loadingIcon from '../../assets/loading-icon.svg'
import axios from 'axios'
import { baseUrl } from '../../api'

const GetOTPForm = ({ handleClose,setEmail,handleNext }) => {
    const [isLoading, setIsLoading] = useState(false)
    const validationSchema = object({
        email: string().email('please enter valid email').required('email is required.')
    })
    const handleSubmit = async(values) => {
        setIsLoading(true)
        axios.post(baseUrl+'/user/getOTP',{email:values.email})
        .then(()=>{
            setEmail(values.email)
            handleNext()
        })
        .catch((error)=>{
            console.log(error)
            alert('Something went wrong')
        })
        .finally(()=>setIsLoading(false))
    }
    return (
        <Formik initialValues={{ email: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <div className='form-container'>
                {
                    !isLoading && <Form className='form'>
                        <AiOutlineClose onClick={handleClose} className='close-icon' />
                        <p>Verify before ask question. OTP will expire in 5 minutes.</p>
                        <div className='input-container'>
                            <label htmlFor="email">Enter your email to get OTP</label>
                            <Field name="email" />
                            <ErrorMessage className='error-container' name='email' component={'div'} />
                        </div>
                        <button className='submit-button'>Get OTP</button>
                    </Form>
                }
                {
                    isLoading && <img src={loadingIcon} alt="loading icon" />
                }
            </div>
        </Formik>
    )
}

export default GetOTPForm