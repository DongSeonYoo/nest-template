### nestjs template

- ORM: Prisma
- Database: Postgresql

### The first things, create directory and clone this repository the latest commit.
```
git clone --depth 1 https://github.com/DongSeonYoo/nest-template.git .
```

### .env files in root directory
```shell
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

PORT="3000"

JWT_SECRET_KEY="secret"
```

### After this, download the package using the npm install command.
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
- ioreids
- dayjs
- jest-mock-extended

### Define interfaces for API success and failure responses
```typescript
interface IResponse {
  statusCode: number;
  message: string;
  timestamp: Date;
  requestURL: string;
}

```

Success response
```typescript
export interface ISuccessResponse<T> extends IResponse {
  data: T;
}
```

Failure response
```typescript
export interface IExceptionResponse extends IResponse {}
```

### TODO
- ~~로깅~~
- ~~Exception Filter~~
- ~~prisma repository 분리 & transaction manager구현~~
- ~~테스트코드~~
- ~~swagger 다양한 옵션~~
- 유틸함수 테스트 추가
- 스웨거 데코레이터 유연하게 리팩토링
- 추가중....
