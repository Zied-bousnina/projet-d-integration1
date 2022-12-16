import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../layout/Layout'
// import styles from '../styles/form.module.css'
import {HiAtSymbol, HiFingerPrint, HiOutlineUser, HiIdentification} from 'react-icons/hi'
import Link from 'next/link'
import { useFormik } from 'formik';
import {useRouter} from 'next/router'

import {register_validate} from '../lib/validate'
const useRegister= () => {
  const router = useRouter()


    const [show, setShow] = useState({password:false, cpass:false})
    const formik = useFormik({
      initialValues: {
        userName: '',
        email: '',
        cin: '',
        password: '',
        cpassword: '',

      },
      validate: register_validate,
      onSubmit,
    })


    // console.log(formik.errors)
    async function onSubmit(values) {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      }

      await fetch('http://localhost:3000/api/auth/signup', options)
        .then(res=> res.json())
        .then((data)=>{
          alert("Account created")
          if(data) router.push('/login')
        })
    }
  return (
    <Layout>
        <Head>
            <title>Register</title>
        </Head>

        <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold ">Sign Up</h1>
          {/* <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor, sit amet consectetur{" "}
          </p> */}
        </div>

        <form className="flex flex-col gap-5 " onSubmit={formik.handleSubmit}>

        <div className={styles.input_group}>
            <input
               className={`${styles.input_text} ${formik.errors.userName && formik.touched.userName? 'border-rose-600':''}`}
              type="text"
              name="userName"
              id=""
              placeholder="User Name"
              {...formik.getFieldProps('userName')}
            />
            <span className="icon flex items-center px-4">
                <HiOutlineUser size={25} />
            </span>
          </div>
          {/* {formik.errors.userName && formik.touched.userName ? <span className="text-rose-400 text-sm">{formik.errors.userName}</span> : <></>} */}

          <div className={styles.input_group}>
            <input
               className={`${styles.input_text} ${formik.errors.email && formik.touched.email? 'border-rose-600':''}`}
              type="email"
              name="email"
              id=""
              placeholder="Email"
              {...formik.getFieldProps('email')}

            />
            <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className="text-rose-400">{formik.errors.email}</span> : <></>} */}

          <div className={styles.input_group}>
            <input type='number'
               className={`${styles.input_text} ${formik.errors.cin && formik.touched.cin? 'border-rose-600':''}`}

              name="cin"
              id=""
              placeholder="CIN"
              minLength={8}
              maxLength={8}
              {...formik.getFieldProps('cin')}

            >

            </input>
             <span className="icon flex items-center px-4" >
                <HiIdentification size={25} />
            </span>
          </div>
          {/* {formik.errors.cin && formik.touched.cin ? <span className="text-rose-400">{formik.errors.cin}</span> : <></>} */}


          <div className={styles.input_group}>
            <input type={`${show.password ? "text": "password"}`}
               className={`${styles.input_text} ${formik.errors.password && formik.touched.password? 'border-rose-600':''}`}

              name="password"
              id=""
              placeholder="Password"
              {...formik.getFieldProps('password')}

            >

            </input>
             <span className="icon flex items-center px-4" onClick={()=>setShow({...show,password:!show.password})}>
                <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <span className="text-rose-400">{formik.errors.password}</span> : <></>}

          <div className={styles.input_group}>
            <input type={`${show.cpass ? "text": "password"}`}
               className={`${styles.input_text} ${formik.errors.cpassword && formik.touched.cpassword? 'border-rose-600':''}`}

              name="cpassword"
              id=""
              placeholder="Confirm Password"
              {...formik.getFieldProps('cpassword')}

            >

            </input>
             <span className="icon flex items-center px-4" onClick={()=>setShow({...show, cpass:!show.cpass})}>
                <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? <span className="text-rose-400">{formik.errors.cpassword}</span> : <></>}




          {/* Login button  */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
            Sign Up
            </button>
          </div>
          {/* <div className="input-button">
            <button type="button" className={styles.button_costum}>
              Sign in with Github
            </button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_costum}>Sign in with Github</button>
          </div> */}

          {/* /Button  */}
          <p className="text-gray-400 text-center">
             Have an account ?{" "}
            <Link href={"/login"} legacyBehavior>
              <a className="text-blue-400">Login</a>
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  )
}

export default useRegister