import React from 'react'
import SteptwoStyle from '../styles/Steptwo.module.css'

function Interest({ register, setActive }) {
    return (
        <div className="MainContent_Container">
            <div className="tell_us_title">
                <h1 className={SteptwoStyle.main_tell_title}>
                    Interest
                </h1>


            </div>

            <div className={SteptwoStyle.product_form}>
                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Hobby
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder="e.g Driving"
                        {...register('interest')}
                    />
                </div>


                <button
                    // type="submit"
                    onClick={() => {
                        return setActive('References')
                    }}
                    className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                >
                    Next step: References
                </button>
            </div>
        </div>
    )
}

export default Interest