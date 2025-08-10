const http = require('http');

const server = http.createServer((req, res) => {
    console.log('요청 받음:', req.url);
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>테스트 서버</title>
        </head>
        <body>
            <h1>🎉 서버가 작동합니다!</h1>
            <p>현재 시간: ${new Date().toLocaleString()}</p>
        </body>
        </html>
    `);
});

const port = 3001;
console.log(`서버를 시작합니다... 포트: ${port}`);

server.listen(port, '127.0.0.1', () => {
    console.log(`✅ 서버가 http://localhost:${port} 에서 실행 중입니다!`);
    console.log('브라우저에서 확인해보세요!');
});

server.on('error', (err) => {
    console.error('❌ 서버 에러:', err.message);
    if (err.code === 'EADDRINUSE') {
        console.log('포트가 이미 사용 중입니다. 다른 포트를 시도해보세요.');
    }
});
