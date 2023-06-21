import './OTPstyle.css'
import React, { useState } from 'react'
import { API } from '../../../API/Api'

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import horseleft from '../../../assets/images/22.png'
import moment from "moment";



export default function OTP() {

    const [spinnerload, setspinnerload] = useState(false)
    let history = useNavigate()
    
    let { email } = useParams()
    const schema = yup.object().shape({
        email: yup.string()
            .required(" Email is required"),
        otp: yup.string().required("OTP is required"),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmitHandler = async (data) => {
        let reg_uid = localStorage?.getItem("reg_uid");
        console.log("reg_uid",reg_uid);
        setspinnerload(true)

        console.log("Email0", data.email);
        console.log("OTP", data.otp);
        let res = await API.post('/verify_email_otp',
            {
                "uid": reg_uid,
                "otp": data.otp
            }
        )
        console.log("Data", res);
        if (res.data.data.result == "Verified") {
            toast.success(`${res.data.data.result}`)
            history(`/welComePage/${reg_uid}`)

        } else {
            toast.error(`${res.data.data.result}`)
            setspinnerload(false)

        }
        setspinnerload(false)

    }
    return (
        <>
            <div class="wrapper main_div_her_login_red otp-ip">
                <section class="login-content " style={{alignItems:'center',paddingTop:'7rem'}}>
                    <div class="container h-100">
                        <div class="row align-items-center justify-content-center h-100">
                            <div class="col-12">

                                <div class="row align-items-center">
                                    <div class="col-lg-6 mb-lg-0 mb-4 mt-lg-0 mt-4">

                                        <img src={horseleft} class="img-fluid w-80" alt="" />
                                    </div>

                                    <div class="col-lg-6">
                                        <h2 class="mb-2">Verify your Email </h2>
                                        <p className='text-white'>We've sent an email to <span> {email} </span>
                                            Please Check your email to verify and continue</p>

                                        <br />
                                        <form className=""
                                            onSubmit={handleSubmit(onSubmitHandler)}
                                        >

                                            <div class="row">
                                                <div id="error-msg"></div>
                                                <div class="col-lg-12">
                                                    <div class="floating-label form-group">
                                                        <input type="text" class="floating-input form-control" name="uid" id="uid"
                                                            {...register("email")}
                                                            readonly value={email}
                                                        />
                                                        <p className="p_tage mt-2">{errors.email?.message}</p>

                                                        <label>User ID</label>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="floating-label form-group">
                                                        <input type="text" class="floating-input  form-control" name="address" id="address"  {...register("otp", { required: true })} />
                                                        <p className="p_tage mt-2">{errors.otp?.message}</p>

                                                        <label>OTP</label>
                                                    </div>
                                                </div>

                                            </div>
                                            <button type="submit" class="btn btn-primary" id="dloginshine" name="submitRegisterMember">{spinnerload ? (<><div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div></>) : "Sign In"}<span id="spinner1" style={{ visibility: "hidden" }}><i class="fa fa-spinner fa-spin"></i></span></button>
                                        </form>



                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </>
    )
}
