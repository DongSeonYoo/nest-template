### nestjs template

- ORM: Prisma
- Database: Postgresql

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
실패 응답: /src/filters/http-exception.filter.ts, /src/filters/prisma-exception.filter.ts

### TODO
- ~~로깅~~
- prisma repository 분리 & transaction manager구현
- 테스트코드
- swagger 다양한 옵션
- 계속추가..