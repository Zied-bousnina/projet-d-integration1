import React from 'react'
import SteptwoStyle from '../styles/Steptwo.module.css'

function Imagesandmedia({ register, setActive }) {
    return (
        <div className="MainContent_Container">
            <div className="tell_us_title">
                <h1 className={SteptwoStyle.main_tell_title}>
                    Certificates
                </h1>


            </div>

            <div className={SteptwoStyle.product_form}>
                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Upload your certificate
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        placeholder="Select an Image"
                        {...register('certificateone')}
                        type="file"
                        multiple
                        accept="image/*"
                    />
                </div>
                {/*
                <div className={SteptwoStyle.product_link_info}>
                    <label
                        className={SteptwoStyle.getstartedlabel}
                        htmlFor=""
                    >
                        Upload your certificate
                    </label>

                    <input
                        className={SteptwoStyle.getstarted_input}
                        placeholder="Select an Image"
                        {...register('certificatetwo')}
                        type="file"
                        multiple
                        accept="image/*"
                    />
                </div>
 */}



                <button
                    // type="submit"
                    onClick={() => {
                        return setActive('Extras')
                    }}
                    className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                >
                    Next step: Extras
                </button>
            </div>
        </div>
    )
}

export default Imagesandmedia