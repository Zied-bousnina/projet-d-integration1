import React from 'react'
import SteptwoStyle from '../styles/Steptwo.module.css'

function Extras({ register, setActive, loading }) {
    return (
        <div className="Images_container">
            <div className="tell_us_title">

                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Language
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        type="text"
                        placeholder="e.g Yoruba"
                        {...register('language')}
                    />
                </div>
                {
                    loading ? <button
                        // onClick={() => {
                        //   return setActive("");
                        // }}
                        type="submit"
                        className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                    >
                        Loading...
                    </button>
                        :

                        <button
                            // onClick={() => {
                            //   return setActive("");
                            // }}
                            type="submit"
                            className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                        >
                            Next step: Download
                        </button>
                }






            </div>
        </div>
    )
}

export default Extras