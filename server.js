const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';
const jwt = require('jsonwebtoken'); 
const app = next({ dev });
const handle = app.getRequestHandler();
const mysql = require('mysql2/promise');

const secretKey = 'song723546';
const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "723546",
  database: "erp",
  connectionLimit: 5,
});

pool.getConnection()
  .then((conn) => {
    console.log('데이터베이스 연결 성공');
    conn.release(); // 연결 해제
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err.message);
  });


app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  // 기본적인 Next.js 페이지 핸들링
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const db = pool;
  
  server.post('/api/signup/signup', async (req, res) => {
    try {
      if (req.method === 'POST') {
        const { userId, password, name, birthdate, phoneNumber, email, address, gender } = req.body;

        // 데이터베이스에 회원 정보 저장
        const [rows, fields] = await db.query(
          `INSERT INTO users (userId, password, name, birthdate, phoneNumber, email, address, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [userId, password, name, birthdate, phoneNumber, email, address, gender]
        );

        res.status(200).json({ message: '회원가입 성공' });
      } else {
        res.status(405).json({ error: '허용되지 않은 메서드' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 에러' });
    }
  });

  server.post('/api/login', async (req, res) => {
    try {
      if (req.method === 'POST') {
        const { userId, password } = req.body;
  
        // 데이터베이스에서 사용자 정보 조회
        const [rows, fields] = await db.query(
          'SELECT * FROM users WHERE userId = ?',
          [userId]
        );
  
        // 사용자가 존재하는지 확인
        if (rows.length === 1) {
          const user = rows[0];
  
          // 비밀번호 검증 (일반적인 비교)
          if (password === user.password) {
            // 로그인 성공
            // 여기에서 토큰 발급 등 로그인 성공 시 필요한 로직 수행
            const token = jwt.sign({ userId, name: user.name }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ token });
          } else {
            // 비밀번호가 일치하지 않음
            res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
          }
        } else {
          // 사용자가 존재하지 않음
          res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }
      } else {
        res.status(405).json({ error: '허용되지 않은 메서드' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 에러' });
    }
  });
  

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});