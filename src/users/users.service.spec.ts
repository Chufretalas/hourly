// users.service.spec.ts (example test file)
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import User from './user.entity';
import CreateUserDto from './dto/create_user_dto';
import UpdateUserDto from './dto/update_user_dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    metadata: { columns: [], connection: { options: { type: '' } } }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    mockUsersRepository.findOneBy.mockReset();
    mockUsersRepository.save.mockReset();
    mockUsersRepository.save.mockImplementation(async (v: User) => v);
  })

  it('should create a user with a hashed password', async () => {
    const createUserDto: CreateUserDto = { username: "testuser", password: "password123" }

    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash')

    const result = await service.createOneUser(createUserDto)

    expect(bcryptHashSpy).toHaveBeenCalledWith(createUserDto.password, 10)

    expect(mockUsersRepository.save).toHaveBeenCalledWith(expect.any(User))

    expect(result.pass_hash).toBeDefined()
    expect(typeof result.pass_hash).toBe('string')
    expect(result.pass_hash).not.toBe("password123")

    expect(result.username).toBe(createUserDto.username)
  })

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { username: 'newuser', password: "1234" };
    const existingUser: User = {
      id: 1, username: 'testuser', pass_hash: 'hashedPassword', created_at: new Date(), updated_at: new Date(),
      clients: [],
      projects: [],
      activities: []
    };

    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash')

    mockUsersRepository.findOneBy.mockResolvedValue(existingUser);

    const result = await service.updateOneUser(1, updateUserDto);
    expect(bcryptHashSpy).toHaveBeenCalledWith(updateUserDto.password, 10)
    expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockUsersRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: existingUser.id,
        username: updateUserDto.username,
        pass_hash: expect.any(String),
      }));

    expect(result.username).toBe(updateUserDto.username);
    expect(typeof result.pass_hash).toBe('string');
    expect(result.pass_hash).not.toBe(updateUserDto.password)
  });

  it('should throw NotFoundException if user is not found', async () => {
    mockUsersRepository.findOneBy.mockResolvedValue(undefined);

    await expect(service.updateOneUser(1, { username: 'newuser' })).rejects.toThrow(NotFoundException);
  });
})

