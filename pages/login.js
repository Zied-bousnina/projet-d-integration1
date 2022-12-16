import Head from "next/head";
import React, { useState } from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import { signIn, signOut} from "next-auth/react"
import { useFormik } from 'formik';

import {HiAtSymbol, HiFingerPrint} from 'react-icons/hi'

import styles from "../styles/Form.module.css";
import {login_validate} from "../lib/validate";
import { useRouter } from "next/router";

const useLogin= () => {
  const router = useRouter()
    const [show, setShow] = useState(false)

    // Formik Hook
    const formik = useFormik({
      initialValues: {
        email:'',
        password:''
      },
      validate: login_validate,
      onSubmit,



    })
    // console.log(formik.errors)

    async function onSubmit(values) {
      const status =await  signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl:'/'
      })

      if(status.ok){
        router.push(status.url)
      }
    }
    // Google handler Function
    async function handleGoogleSignIn() {
      signIn('google', {callbackUrl: "http://localhost:3000"})
    }

    // GitHub Handler Login
    async function handleGitHubSignIn() {
      signIn('github', {callbackUrl: "http://localhost:3000"})
    }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold ">Explore</h1>
          {/* <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor, sit amet consectetur{" "}
          </p> */}
        </div>

        <form className="flex flex-col gap-5 " onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input

              className={`${styles.input_text} ${formik.errors.email && formik.touched.email ? 'border-rose-600': ''}`}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className="text-rose-400">{formik.errors.email}</span> : <></>} */}

          <div className={styles.input_group}>
            <input type={`${show ? "text": "password"}`}
              className={`${styles.input_text} ${formik.errors.password && formik.touched.password? 'border-rose-600':''}`}

              name="password"
              id="password"
              placeholder="Password"
              {...formik.getFieldProps('password')}

            >

            </input>
             <span className="icon flex items-center px-4" onClick={()=>setShow(!show)}>
                <HiFingerPrint size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password? <span className="text-rose-400">{formik.errors.password}</span> : <></>} */}


          {/* Login button  */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button onClick={handleGoogleSignIn} type="button" className={styles.button_costum}>
              Sign in with Google
            </button>
          </div>
          <div className="input-button" >
            <button onClick={handleGitHubSignIn} type="button" className={styles.button_costum}>Sign in with Github</button>
          </div>

          {/* /Button  */}
          <p className="text-gray-400 text-center">
            don &apos t have an account yet ?{" "}
            <Link href={"/register"} legacyBehavior>
              <a className="text-blue-400">Sign Up</a>
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}

export default useLogin;
