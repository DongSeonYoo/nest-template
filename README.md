### nestjs template

- ORM: Prisma
- Database: Postgresql

### 먼저, 현재 저장소의 최신 상태를 클론합니다
```
git clone --depth 1 https://github.com/DongSeonYoo/nest-prisma-template.git .
```

### .env파일을 만들어줍니다
```shell
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

PORT="3000"

JWT_SECRET_KEY="secret"
```

### 이휴 npm install로 패키지를 다운로드합니다
```shell
npm install
```

## package list
- swagger
- @nestjs/config
- @nestjs/jwt
- @nestjs/passport
- @nestjs/serve-static
- class-transformer
- class-validator
- passport-jwt
- cookie-parser

## template list
### 정적 콘텐츠 제공
- static위치 '/client'
- nest의 ServeStaticModule을 통해 정적 콘텐츠를 제공
- api 라우트를 제외한 요청 경로에 따른 html 페이지 제공

### api성공, 실패 공통 인터페이스 정의
응답 인터페이스
```typescript
interface IResponse {
  statusCode: number;
  message: string | string[];
  timestamp: Date;
  requestURL: string;
}

```
성공 응답
```typescript
export interface ISuccessResponse<T> extends IResponse {
  data: T;
}
```

실패 응답
```typescript
export interface IExceptionResponse extends IResponse {}
```

성공 응답: /src/interceptors/response.interceptor.ts
<br>
실패 응답: /src/filters/*.filter.ts

### TODO
- ~~로깅~~
- prisma repository 분리 & transaction manager구현
- 테스트코드
- swagger 다양한 옵션
- 계속추가..
