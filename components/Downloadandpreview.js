import React, { useEffect, useState } from 'react'
import Previewstyle from '../styles/Preview.module.css'
import { useRouter } from 'next/router'


function Downloadandpreview({ onClick }) {
    const router = useRouter()
    const [alldata, setAlldata] = useState()


    useEffect(() => {


        JSON.parse(localStorage?.getItem('user_id')) === '' ||
            JSON.parse(localStorage?.getItem('user_id')) === undefined ||
            JSON.parse(localStorage?.getItem('user_id')) === null ||
            JSON.parse(localStorage?.getItem('user_id')) === '{}'
            ? router.push('/')
            : router.push('/cv/preview')

        fetch('/api/fetchall', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((response) => {
                let newObjectuser = JSON.parse(localStorage.getItem('user_id'))
                setAlldata(
                    response?.filter((x) => x?.unique_id === newObjectuser.unique_id),
                )

            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <div>
            <div className="flex mt-10 justify-between ">
                <div onClick={onClick} className={Previewstyle.preview}>

                    <span className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded" >
                        Download
                    </span>
                </div>


                <div
                    onClick={() =>
                        router.push({
                            pathname: '/cv/edit',
                            query: {
                                userdata: {
                                    data: alldata[0],
                                },

                                useravailabledata: `${alldata}`,
                            },
                        })
                    }
                    className={Previewstyle.preview}
                >
                    <span className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded" >
                        Edit
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Downloadandpreview
