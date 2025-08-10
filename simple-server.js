const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <title>TripKit 테스트</title>
            </head>
            <body>
                <h1>🎉 TripKit 웹사이트가 성공적으로 실행되었습니다!</h1>
                <p>서버가 정상적으로 작동하고 있습니다.</p>
                <p>이제 React 앱을 실행할 수 있습니다.</p>
            </body>
            </html>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 8080;

// 에러 처리 추가
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`포트 ${PORT}가 이미 사용 중입니다. 다른 포트를 시도합니다...`);
        server.listen(PORT + 1);
    } else {
        console.error('서버 에러:', err);
    }
});

server.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    console.log('브라우저에서 확인해보세요!');
    console.log('서버를 종료하려면 Ctrl+C를 누르세요.');
});

// 프로세스 종료 처리
process.on('SIGINT', () => {
    console.log('\n서버를 종료합니다...');
    server.close(() => {
        console.log('서버가 종료되었습니다.');
        process.exit(0);
    });
});
