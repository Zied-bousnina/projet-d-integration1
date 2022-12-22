import React, { useState, useContext, useEffect } from 'react'
import SteptwoStyle from '../styles/Steptwo.module.css'
import { useForm } from 'react-hook-form'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import Education from '../components/Education'
import Interest from '../components/Interest'
import References from '../components/References'
import Skills from '../components/Skills'
import Imagesandmedia from '../components/Imagesandmedia'
import Extras from '../components/Extras'

function afteredit() {
    const [maininfo, setMainInfo] = useState(false)
    const [, SetSideClicked] = useState('')
    const [active, setActive] = useState('Experience')
    const router = useRouter()
    const SideData = [
        {
            Icon: '',
            title: 'Experience',
        },
        {
            Icon: '',
            title: 'Education and Qualification',
        },
        {
            Icon: '',
            title: 'Interests',
        },
        {
            Icon: '',
            title: 'References',
        },
        ,
        {
            Icon: '',
            title: 'Skills',
        },
        {
            Icon: '',
            title: 'Images and media',
        },
        {
            Icon: '',
            title: 'Extras',
        },
    ]

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

    useEffect(() => {
        JSON.parse(localStorage?.getItem('user_id'))
        JSON.parse(localStorage?.getItem('firstpagetoedit'))

        router.replace('/cv/afteredit', undefined, { shallow: true })

        if (
            JSON.parse(localStorage?.getItem('user_id')) === '' ||
            JSON.parse(localStorage?.getItem('user_id')) === undefined ||
            JSON.parse(localStorage?.getItem('user_id')) === null
        ) {
            router.push('/')
        } else {
            router.push('/cv/afteredit')
        }
    }, [])

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
    })

    const onSubmit3 = (data) => {
        const fileName = generateRandom(4)
        var formdata = new FormData()
        formdata.append('file', data.certificateone[0], '[PROXY]')
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
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.secure_url !== ' ') {
                    let Details = JSON.parse(localStorage.getItem('firstpagetoedit'))

                    const IDData = JSON.parse(localStorage.getItem('firstpagetoedit'))?.id

                    fetch('/api/edit', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            Full_name: Details.steponedata.Full_name,
                            Email: Details.steponedata.Email,
                            Role: Details.steponedata.Role,
                            Phone_number: Details.steponedata.Phone_number,
                            Address: Details.steponedata.Address,
                            Profile_Photo_Url: Details.steponedata.Profile_Photo_Url,
                            Public_id: Details.steponedata.Public_id,
                            unique_id: Details.steponedata.unique_id,
                            Job_Title_Ex: data.jobtitle,
                            City_town_Ex: data.cityortown,
                            Employer_Ex: data.employer,
                            Start_date_ex: data.startdate,
                            End_Date_Ex: data.enddate,
                            Achievement_one_Ex: data.achievement1,
                            Achievement_two_Ex: data.achievement2,
                            Achievement_three_Ex: data.achievement3,
                            Degree_Ed: data.degree,
                            City_Ed: data.educity,
                            School_Ed: data.eduschool,
                            Start_date_Ed: data.startdateedu,
                            End_date_Ed: data.enddateedu,
                            Award_one_Ed: data.eduaward,
                            Award_two_Ed: data.eduaward2,
                            Award_three_Ed: data.eduaward3,
                            Hobby: data.interest,
                            Company_name_Rfx: data.companyname,
                            Contact_person_Rfx: data.contactPerson,
                            Phone_number_Rfx: data.PhoneNumber,
                            Email_Address_Rfx: data.emailaddress,
                            Skill: data.skill,
                            Level_sk: data.Skilllevel,
                            Cert_Img_one_url: result.secure_url,
                            Language: data.language,
                            Cert_Public_id: result.public_id,
                            id: IDData
                        }),
                    })
                        .then((response) => response.json())
                        .then(async (response) => {
                            return (
                                console.log(response),
                                await router.push({
                                    pathname: '/cv/preview',
                                    query: { ...data, data: { TeamA: 'yes', TeamB: 'no' } },
                                })
                            )
                        })
                        .catch((err) => console.error(err))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div>
                <div className="prd_container">
                    <Nav />

                    <div className={SteptwoStyle.product_body_container}>
                        <div className="submission_content">
                            <div className={SteptwoStyle.draft_title}>
                                <h1 className="drfat_name">Welcome {router.query.full_name}</h1>
                            </div>
                        </div>

                        <div className={SteptwoStyle.menu_content}>
                            <div className={SteptwoStyle.product_side_menu}>
                                <div className={SteptwoStyle.menu_item_container}>
                                    {SideData?.map((x, i) => {
                                        return (
                                            <div className="images_and_media_container">
                                                <h1
                                                    onClick={() => {
                                                        return (
                                                            SetSideClicked(x?.title),
                                                            setMainInfo(!maininfo),
                                                            setActive(x?.title)
                                                        )
                                                    }}
                                                    className={`${SteptwoStyle.images_info_content
                                                        } cursor-pointer ${active === x?.title && `${SteptwoStyle.active}`
                                                        }`}
                                                >
                                                    {x.title}
                                                </h1>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className={SteptwoStyle.product_form_content}>
                                <form
                                    className={SteptwoStyle.form}
                                    onSubmit={handleSubmit(onSubmit3)}
                                >
                                    {active === 'Experience' ? (
                                        <div className="MainContent_Container">
                                            <div className="tell_us_title">
                                                <h1 className={SteptwoStyle.main_tell_title}>
                                                    Tell us more about your experience
                                                </h1>

                                                <p className={SteptwoStyle.sub_tell_us_content}>
                                                    Work experience
                                                </p>
                                            </div>

                                            <div className={SteptwoStyle.product_form}>
                                                <div className={SteptwoStyle.product_link_info}>
                                                    <label
                                                        className={SteptwoStyle.getstartedlabel}
                                                        htmlFor=""
                                                    >
                                                        Job Title
                                                    </label>

                                                    <input
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="text"
                                                        placeholder="e.g Cloud Engineer"
                                                        {...register('jobtitle')}
                                                    // defaultValue=''
                                                    />
                                                </div>

                                                <div className={SteptwoStyle.product_link_info}>
                                                    <label
                                                        className={SteptwoStyle.getstartedlabel}
                                                        htmlFor=""
                                                    >
                                                        City/Town
                                                    </label>

                                                    <input
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="text"
                                                        placeholder="e.g Lagos Nigeria"
                                                        {...register('cityortown')}
                                                    />
                                                </div>

                                                <div className={SteptwoStyle.product_link_info}>
                                                    <label
                                                        className={SteptwoStyle.getstartedlabel}
                                                        htmlFor=""
                                                    >
                                                        Employer
                                                    </label>

                                                    <input
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="text"
                                                        placeholder="e.g Hackmamba"
                                                        {...register('employer')}
                                                    />
                                                </div>

                                                <div className={SteptwoStyle.product_link_info}>
                                                    <label
                                                        className={SteptwoStyle.getstartedlabel}
                                                        htmlFor=""
                                                    >
                                                        Start Date
                                                    </label>

                                                    <input
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="date"
                                                        placeholder="e.g Hackmamba"
                                                        {...register('startdate')}
                                                    />
                                                </div>

                                                <div className={SteptwoStyle.product_link_info}>
                                                    <label
                                                        className={SteptwoStyle.getstartedlabel}
                                                        htmlFor=""
                                                    >
                                                        End Date
                                                    </label>

                                                    <input
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="date"
                                                        placeholder="e.g Hackmamba"
                                                        {...register('enddate')}
                                                    />
                                                </div>

                                                <div className={SteptwoStyle.product_link_info}>
                                                    <label
                                                        className={SteptwoStyle.getstartedlabel}
                                                        htmlFor=""
                                                    >
                                                        Description
                                                    </label>

                                                    <textarea
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="date"
                                                        placeholder="e.g Achievement 1"
                                                        {...register('achievement1')}
                                                    />

                                                    <textarea
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="date"
                                                        placeholder="e.g Achievement 2"
                                                        {...register('achievement2')}
                                                    />

                                                    <textarea
                                                        className={SteptwoStyle.getstarted_input}
                                                        type="date"
                                                        placeholder="e.g Achievement 3"
                                                        {...register('achievement3')}
                                                    />
                                                </div>

                                                <button
                                                    // type="submit"
                                                    onClick={() => {
                                                        return setActive('Education and Qualification')
                                                    }}
                                                    className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                                                >
                                                    Next step: Education and Qualification
                                                </button>
                                            </div>
                                        </div>
                                    ) : active === 'Education and Qualification' ? (
                                        <Education register={register} setActive={setActive} />
                                    ) : active === 'Interests' ? (
                                        <Interest register={register} setActive={setActive} />
                                    ) : active === 'References' ? (
                                        <References register={register} setActive={setActive} />
                                    ) : active === 'Skills' ? (
                                        <Skills register={register} setActive={setActive} />
                                    ) : active === 'Images and media' ? (
                                        <Imagesandmedia register={register} setActive={setActive} />
                                    ) : active === 'Extras' ? (
                                        <Extras register={register} setActive={setActive} />
                                    ) : null}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default afteredit
