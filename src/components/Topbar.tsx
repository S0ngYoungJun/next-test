'use client'


import React, { useState, useEffect } from "react";
import styles from "@/app/styles/topbar.module.scss";
import Link from "next/link";
import jwt, { JwtPayload } from 'jsonwebtoken';

function Topbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState<string | JwtPayload>('');

  useEffect(() => {
    const loadUserFromToken = () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwt.decode(token) as JwtPayload;

        if (decodedToken) {
          const userName = decodedToken.name;
          setIsLoggedIn(true);
          setName(userName);
        }
      } else {
        setIsLoggedIn(false);
        setName('');
      }
    };

    loadUserFromToken();
  }, []); // 페이지 로드 시 한 번만 실행

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setName('');
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.div1}></div>
      <div className={styles.div2}></div>
      <div className={styles.div3}>
        {/* 로그인 상태에 따라 다르게 표시 */}
        {isLoggedIn ? (
          <>
            <p>{`${name}님 환영합니다.`}</p>
            <Link href="/mypage">마이페이지</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link href="/signup">SignUp</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Topbar;
