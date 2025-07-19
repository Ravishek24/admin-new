import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../utils/apiService"; 
import { clippingParents } from "@popperjs/core";

const SignInLayer = () => {
  const [email, setEmail] = useState("admin@duewin.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await signIn(email);
      localStorage.setItem("token", data?.data?.token); 
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='assets/images/auth/auth-img.png' alt='' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/' className='mb-40 max-w-290-px'>
              <img src='assets/images/logo.png' alt='' />
            </Link>
            <h4 className='mb-12'>Sign In to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type='password'
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='your-password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && (
              <div className="alert alert-danger py-2 px-3 radius-12 mb-2">
                {error}
              </div>
            )}
            <div className='d-flex justify-content-between gap-2'>
              <div className='form-check style-check d-flex align-items-center'>
                <input
                  className='form-check-input border border-neutral-300'
                  type='checkbox'
                  id='remember'
                />
                <label className='form-check-label' htmlFor='remember'>
                  Remember me
                </label>
              </div>
              <Link to='#' className='text-primary-600 fw-medium'>
                Forgot Password?
              </Link>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              Sign In
            </button>
            <div className='mt-32 center-border-horizontal text-center'>
              <span className='bg-base z-1 px-4'>Or sign in with</span>
            </div>
            <div className='mt-32 d-flex align-items-center gap-3'>
              <button type='button' className='btn btn-outline w-50'>
                <Icon icon='ic:baseline-facebook' />
                Facebook
              </button>
              <button type='button' className='btn btn-outline w-50'>
                <Icon icon='logos:google-icon' />
                Google
              </button>
            </div>
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Don’t have an account?{" "}
                <Link to='/sign-up' className='text-primary-600 fw-semibold'>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
