import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import Home from '../../styles/Home.module.css'
import { useRouter } from 'next/router'


import Nav from '../../components/Nav'

function Edit() {
    const [, setSigneedIn] = useState(false)

    const router = useRouter()
    const {
        register,
        reset,

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
                        fetch('/api/fetchall', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            method: 'GET'
                        })
                            .then((response) => response.json())
                            .then((response) => {
                                const Incomingdata = response?.filter(
                                    (x) => x?.unique_id === id,
                                )

                                console.log(Incomingdata, 'Incoming')

                                if (Incomingdata.length !== 0) {
                                    router.push({
                                        pathname: '/cv/afteredit',
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
                                                unique_id: `${Incomingdata[0].unique_id}`,
                                                id: `${Incomingdata[0].id}`,
                                            },
                                            img_url: `${result.secure_url}`,
                                            unique_id: `${Incomingdata[0].unique_id}`,
                                            profile_phot_public_id: `${result.public_id}`,
                                            id: `${Incomingdata[0].id}`,
                                        },
                                    })

                                    localStorage.setItem(
                                        'firstpagetoedit',

                                        JSON.stringify({
                                            steponedata: {
                                                Full_name: `${data.full_name}`,
                                                Email: `${data.email}`,
                                                Role: `${data.role}`,
                                                Phone_number: `${data.phonenumber}`,
                                                Address: `${data.address}`,
                                                Profile_Photo_Url: `${result.secure_url}`,
                                                Public_id: `${result.public_id}`,
                                                unique_id: `${Incomingdata[0].unique_id}`,
                                                profile_phot_public_id: `${result.public_id}`,
                                                img_url: `${result.secure_url}`,
                                                id: `${result.id}`,
                                            },
                                            img_url: `${result.secure_url}`,
                                            unique_id: `${Incomingdata[0].unique_id}`,
                                            profile_phot_public_id: `${result.public_id}`,
                                            id: `${Incomingdata[0].id}`,
                                        }),
                                    )
                                }
                            })
                            .catch((err) => console.error(err))
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const [id, setid] = useState()

    useEffect(() => {
        JSON.parse(localStorage?.getItem('user_id')) === '' ||
            JSON.parse(localStorage?.getItem('user_id')) === undefined ||
            JSON.parse(localStorage?.getItem('user_id')) === null ||
            JSON.parse(localStorage?.getItem('user_id')) === '{}'
            ? router.push('/')
            : setid(JSON.parse(localStorage?.getItem('user_id')).unique_id)

        router.replace('/edit', undefined, { shallow: true })
        let newObjectuser = JSON.parse(localStorage?.getItem('user_id'))
        newObjectuser?.unique_id !== ' ' ? setSigneedIn(true) : setSigneedIn(false)

        if (
            JSON.parse(localStorage?.getItem('user_id')) === '' ||
            JSON.parse(localStorage?.getItem('user_id')) === undefined ||
            JSON.parse(localStorage?.getItem('user_id')) === null
        ) {
            router.push('/')
        } else {
            router.push('/cv/edit')
        }
    }, [])

    return (
        <div>
            <>
                <div className={Home.resume_body}>
                    <div className="top_nav">
                        <Nav />
                    </div>

                    <div className={Home.resume_main}>
                        <div className={Home.left_image}>
                            <h1 className={Home.formtitle}>
                                In just minutes, create a job-ready resume
                            </h1>
                        </div>

                        <div className={Home.right_form}>
                            <h1 className={Home.form_title}>Create my Resume</h1>

                            <p className={Home.sub_title}>
                                With quick Resume, you can build the right resume  today.
                            </p>

                            <div className={Home.resume_form}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={Home.resumelinkinfo}>
                                        <label className={Home.getstartedlabel} htmlFor="">
                                            Full Name
                                        </label>

                                        <input
                                            // defaultValue={alldata[0].Full_name}
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
                                            // defaultValue={alldata[0].Role}
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
                                            // defaultValue={alldata[0].Phone_number}
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
                                            // defaultValue={alldata[0].Email}
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

                                    <button
                                        type="submit"
                                        className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                                    >
                                        Get started
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Edit
