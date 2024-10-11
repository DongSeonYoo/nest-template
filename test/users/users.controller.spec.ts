import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRequestDto } from 'src/apis/users/dtos/create-user.dto';
import { UsersController } from 'src/apis/users/users.controller';
import { UsersModule } from 'src/apis/users/users.module';
import { UsersService } from 'src/apis/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PrismaModule],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  // 모킹 없이 테스트환경 구축해서 통테로.
  it.todo('should create a new users');
});
