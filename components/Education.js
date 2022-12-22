import React from 'react'
import SteptwoStyle from '../styles/Steptwo.module.css'

export default function ({ register, setActive }) {
    return (
        <div>

            <div className="MainContent_Container">
                <div className="tell_us_title">
                    <h1 className={SteptwoStyle.main_tell_title}>
                        Education and Qualification
                    </h1>

                    <p className={SteptwoStyle.sub_tell_us_content}>
                        Education
                    </p>
                </div>

                <div className={SteptwoStyle.product_form}>
                    <div className={SteptwoStyle.product_link_info}>
                        <label
                            className={SteptwoStyle.getstartedlabel}
                            htmlFor=""
                        >
                            Degree
                        </label>

                        <input
                            className={SteptwoStyle.getstarted_input}
                            type="text"
                            placeholder="e.g Bachelor of Mathematics"
                            {...register('degree')}
                            defaultValue=""
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
                            {...register('educity')}
                        />
                    </div>

                    <div className={SteptwoStyle.product_link_info}>
                        <label
                            className={SteptwoStyle.getstartedlabel}
                            htmlFor=""
                        >
                            School
                        </label>

                        <input
                            className={SteptwoStyle.getstarted_input}
                            type="text"
                            placeholder="e.g Kwara State University"
                            {...register('eduschool')}
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
                            placeholder="e.g Startdate"
                            {...register('startdateedu')}
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
                            placeholder="e.g enddate"
                            {...register('enddateedu')}
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
                            placeholder="e.g Award 1"
                            {...register('eduaward')}
                        />

                        <textarea
                            className={SteptwoStyle.getstarted_input}
                            type="date"
                            placeholder="e.g Award 2"
                            {...register('eduaward2')}
                        />

                        <textarea
                            className={SteptwoStyle.getstarted_input}
                            type="date"
                            placeholder="e.g Archviement 3"
                            {...register('eduaward3')}
                        />
                    </div>

                    <button
                        // type="submit"
                        onClick={() => {
                            return setActive('Interests')
                        }}
                        className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                    >
                        Next step: Interests
                    </button>
                </div>
            </div>



        </div>
    )
}
