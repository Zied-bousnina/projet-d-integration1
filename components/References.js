import React from 'react'
import SteptwoStyle from '../styles/Steptwo.module.css'

function References({ register, setActive }) {
    return (
        <div className="MainContent_Container">
            <div className="tell_us_title">
                <h1 className={SteptwoStyle.main_tell_title}>
                    References
                </h1>


            </div>

            <div className={SteptwoStyle.product_form}>
                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Company Name
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder=""
                        {...register('companyname')}
                    />
                </div>

                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Contact Person
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder=""
                        {...register('contactPerson')}
                    />
                </div>

                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Phone Number
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder=""
                        {...register('PhoneNumber')}
                    />
                </div>

                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Email Address
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder=""
                        {...register('emailaddress')}
                    />
                </div>

                <button
                    // type="submit"
                    onClick={() => {
                        return setActive('Skills')
                    }}
                    className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                >
                    Next step: Skills
                </button>
            </div>
        </div>
    )
}

export default References