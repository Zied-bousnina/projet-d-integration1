import React from 'react'
import SteptwoStyle from '../styles/Steptwo.module.css'

function Skills({ register, setActive }) {
    return (
        <div className="MainContent_Container">
            <div className="tell_us_title">
                <h1 className={SteptwoStyle.main_tell_title}>Skills</h1>


            </div>

            <div className={SteptwoStyle.product_form}>
                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Skill
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder="e.g. Microsoft Word"
                        {...register('skill')}
                    />
                </div>

                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Level
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder="Expert"
                        {...register('Skilllevel')}
                    />
                </div>





                <button
                    // type="submit"
                    onClick={() => {
                        return setActive('Images and media')
                    }}
                    className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                >
                    Next step: Images and media
                </button>
            </div>
        </div>
    )
}

export default Skills