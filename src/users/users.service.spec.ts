import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user by username', async () => {
      const hash = await bcrypt.hash('password', 10);
      const mockUser = { id: 1, username: 'testuser', password: 'password', roles: [], hashPassword: hash };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      const result = await usersService.findOne('testuser');
      expect(result).toEqual(mockUser);
    });

    it('should return undefined if user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const result = await usersService.findOne('nonexistentuser');
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        password: 'newpassword',
      };
      const hash = await bcrypt.hash('newpassword', 10);
      const mockUser = { id: 1, ...createUserDto, roles: [], hashPassword: hash };
      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

      const result = await usersService.createUser(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });
});
