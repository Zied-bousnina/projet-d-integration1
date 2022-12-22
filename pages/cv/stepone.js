import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { set, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Home from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { GlobalContext } from './../../context/globalContext'
import Nav from '../../components/Nav'
import TopMenu from '../../components/TopMenu'

import { signupContext } from './../../context/signupContext';
import Layout from '../../components/Layout'
function Stepone() {
  const { user, setUser, loggedinuser, setLoggedinuser } = useContext(
    GlobalContext,
  )
  const { signupid, setsignupid } = useContext(signupContext)
  const [signnedin, setSigneedIn] = useState(false)
  const [loadingstate, setLoadingState] = useState(false)

  const router = useRouter()

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  const generateRandom = (length) => {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }


  const onSubmit = async (data) => {

    reset({
      resumelink: '',
    })

    if (
      data.MyImage[0].name != '' &&
      data.email !== ' ' &&
      data.address !== ' ' &&
      data.full_name !== ' ' &&
      data.phonenumber !== ' ' &&
      data.role !== ' '
    ) {
      setLoadingState(true)
      const fileName = generateRandom(4)
      var formdata = new FormData()
      formdata.append('file', data.MyImage[0], '[PROXY]')
      formdata.append('upload_preset', 'ml_default')
      formdata.append('public_id', `${fileName}`)
      formdata.append('api_key', `${process.env.REACT_APP_CLOUDINARY_API_KEY}`)

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      }

      fetch(
        'https://api.cloudinary.com/v1_1/femakin/image/upload',
        requestOptions,
      )
        .then(async (response) => {
          return await response.json()
        })
        .then(async (result) => {
          if (result?.secure_url !== ' ') {
            setLoadingState(!loadingstate)
            localStorage.setItem(
              'user_id',

              JSON.stringify({
                // unique_id: signupid.unique_id === undefined || signupid.unique_id === '{}' ||
                //   signupid.unique_id === null ?

                unique_id:
                  loggedinuser?.data?.id === undefined ||
                    loggedinuser?.data?.id === '{}' ||
                    loggedinuser?.data?.id === null
                    ? JSON.parse(localStorage.getItem('user_id'))?.unique_id
                    : loggedinuser?.data?.id,
              }),
            )
            setUser(() => {
              return {
                Full_name: data?.full_name,
                Email: data?.email,
                Role: data?.role,
                Phone_number: data?.phonenumber,
                Address: data?.address,
                Profile_Photo_Url: result?.secure_url,
                Public_id: result?.public_id,

                unique_id:
                  loggedinuser?.data?.id === undefined ||
                    loggedinuser?.data?.id === '{}' ||
                    loggedinuser?.data?.id === null
                    ? JSON.parse(localStorage.getItem('user_id'))?.unique_id
                    : loggedinuser?.data?.id,
              }
            })

            localStorage.setItem(
              'user_details',

              JSON.stringify({
                Full_name: `${data?.full_name}`,
                Email: `${data?.email}`,
                Role: `${data?.role}`,
                Phone_number: `${data?.phonenumber}`,
                Address: `${data?.address}`,
                Profile_Photo_Url: `${result?.secure_url}`,
                Public_id: `${result?.public_id}`,

                unique_id:
                  loggedinuser?.data?.id === undefined ||
                    loggedinuser?.data?.id === '{}' ||
                    loggedinuser?.data?.id === null
                    ? JSON.parse(localStorage.getItem('user_id'))?.unique_id
                    : loggedinuser?.data?.id,
              }),
            )



            await router.push({
              pathname: '/cv/steptwo',
              query: {
                ...data,
                steponedata: {
                  Full_name: `${data.full_name}`,
                  Email: `${data.email}`,
                  Role: `${data.role}`,
                  Phone_number: `${data.phonenumber}`,
                  Address: `${data.address}`,
                  Profile_Photo_Url: `${result.secure_url}`,
                  Public_id: `${result.public_id}`,
                  unique_id:
                    loggedinuser?.data?.id === undefined ||
                      loggedinuser?.data?.id === '{}' ||
                      loggedinuser?.data?.id === null
                      ? JSON.parse(localStorage.getItem('user_id'))?.unique_id
                      : loggedinuser?.data?.id,
                },
                img_url: `${result.secure_url}`,
                unique_id:
                  loggedinuser?.data?.id === undefined ||
                    loggedinuser?.data?.id === '{}' ||
                    loggedinuser?.data?.id === null
                    ? JSON.parse(localStorage?.getItem('user_id')).unique_id
                    : loggedinuser?.data?.id,
                profile_phot_public_id: `${result.public_id}`,
              },
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    router.replace('/cv/stepone', undefined, { shallow: true })
    let newObjectuser = JSON.parse(localStorage?.getItem('user_id'))
    newObjectuser?.unique_id !== ' ' ? setSigneedIn(true) : setSigneedIn(false)

    if (
      JSON.parse(localStorage?.getItem('user_id')) === '' ||
      JSON.parse(localStorage?.getItem('user_id')) === undefined ||
      JSON.parse(localStorage?.getItem('user_id')) === null
    ) {
      router.push('/')
    } else {
      router.push('/cv/stepone')
    }
  }, [])

  return (
    <Layout>
    <div>
      <>
        <div className={Home.resume_body}>


          <div className={Home.resume_main}>


            <div className={Home.right_form}>
              <h1 className={Home.form_title}>Create my Resume</h1>

              <p className={Home.sub_title}>
                With quick Resume, you can build the right resume today.
              </p>

              <div className={Home.resume_form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Full Name
                    </label>

                    <input
                      defaultValue=""
                      required
                      className={Home.getstartedinput}
                      {...register('full_name')}
                      placeholder="FullName"
                      type="text"
                    />
                  </div>

                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Role
                    </label>

                    <input
                      defaultValue=""
                      required
                      className={Home.getstartedinput}
                      {...register('role')}
                      placeholder="e.g. Software Engineer"
                      type="text"
                    />
                  </div>

                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Phone number
                    </label>

                    <input
                      defaultValue=""
                      required
                      className={Home.getstartedinput}
                      {...register('phonenumber')}
                      placeholder="+23470..."
                      type="text"
                    />
                  </div>

                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Email
                    </label>

                    <input
                      defaultValue=""
                      required
                      className={Home.getstartedinput}
                      {...register('email')}
                      placeholder="abc@gmail.com"
                      type="email"
                    />
                  </div>

                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Address
                    </label>

                    <input
                      defaultValue=""
                      required
                      className={Home.getstartedinput}
                      {...register('address')}
                      placeholder="Lagos, Nigeria"
                      type="text"
                    />
                  </div>

                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Profile Photo
                    </label>

                    <input
                      required
                      type="file"
                      className={Home.getstartedinput}
                      placeholder="Select an Image"
                      multiple
                      accept="image/*"
                      {...register('MyImage')}
                    />
                  </div>

                  {
                    loadingstate ? <button
                      type="submit"
                      className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                    >
                      Loading...
                    </button> :
                      <button
                        type="submit"
                        className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                      >
                        Get started
                      </button>
                  }


                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
    </Layout>
  )
}

export default Stepone
