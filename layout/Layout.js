import React from "react";
import styles from "../styles/Layout.module.css";

function Layout({ children }) {
  return (
    <div className="flex h-screen  bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-fit grid lg:grid-cols-2  ">
        <div className={styles.imgStyle}>
          {/* <img className='w-full' src="/diego-ph-fIq0tET6llw-unsplash (1).jpg" alt="" /> */}
          <div className={`${styles.cartoonimg}`}></div>
        </div>

        <div className="right flex flex-col justify-evenly  ">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
      {/* {children} */}
    </div>
  );
}

export default Layout;
