import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { setUserLogin} from "shared/stores/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {useTranslation} from "react-i18next";
import {DEMO_USER} from "src/constants/config.js";
import {DefaultUserRouter} from "src/routers/router.js";

function Login() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiResponse, setApiResponse] = useState({ status: true, msg: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    if((data.email === DEMO_USER.email) && (data.password === DEMO_USER.password)) {
      dispatch(setUserLogin({token: data.email, user: data.email}));
      navigate(DefaultUserRouter);
    }
    else {
      setApiResponse({status: false, msg: "Invalid email or password"});
    }
  };

  const handleForgotPasswordClick = () => {
    console.log('Forgot Password link clicked');
  };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <FaUserCircle className="text-6xl text-primary" />
          </div>
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full"
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-neutral-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div className={"text-error mt-4"}>
              {!apiResponse.status && apiResponse.msg}
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          {/*<div className="text-center mt-4">*/}
          {/*  <span className="label-text">Don't have an account?</span>*/}
          {/*  <a onClick={() => navigate(RouteRegister.path)} className="link link-primary ml-2">Register</a>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

export default Login;
