'use client';

import React, { useState } from 'react';

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공
        const { token, name } = data;
        localStorage.setItem('token', token);
        sessionStorage.setItem('name', name); // 사용자 이름 세션에 저장
        console.log('로그인 성공');

        window.location.href = '/';
      } else {
        // 로그인 실패
        console.error('로그인 실패:', data.error);
      }
    } catch (error) {
      console.error('서버 에러:', error);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form>
        <label>
          아이디:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
