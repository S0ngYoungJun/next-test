'use client'

import React from "react";
import styles from "@/app/styles/topbar.module.scss";
import Link from "next/link"; 
// import SignUp from '@/app/signup/SignUp';
// import Login from '../app/login/Login';


function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.div1}></div>
      <div className={styles.div2}></div>
      <div className={styles.div3}>
      <Link href="/signup">SignUp</Link>
      <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

export default Topbar;