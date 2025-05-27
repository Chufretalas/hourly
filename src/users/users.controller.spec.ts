import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import CreateUserDto from './dto/create_user_dto';
import UpdateUserDto from './dto/update_user_dto';
import User from './user.entity';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  const mockUsersService = {
    createOneUser: jest.fn(),
    updateOneUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = module.get<UsersController>(UsersController);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { username: 'testuser', password: 'password123' };

    // Get the current date in ISO string format for consistent comparison
    const now = new Date().toISOString();

    // Define expectedUser with string representations for dates
    // This mocks the behavior of JSON serialization/deserialization over HTTP
    const expectedUser = {
      id: 1,
      username: 'testuser',
      pass_hash: 'hashedPassword',
      created_at: now, // Use string here
      updated_at: now, // Use string here
      clients: [],
      projects: [],
      activities: []
    };
    mockUsersService.createOneUser.mockResolvedValue({
      id: 1, username: 'testuser', pass_hash: 'hashedPassword',
      created_at: new Date(now), // Mock service returns Date objects, which will be serialized
      updated_at: new Date(now),
      clients: [], projects: [], activities: []
    } as User); // Cast to User to satisfy type expectations if needed

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .expect(expectedUser); // Now this should match
  });

  it('should update a user', async () => {
    const now = new Date().toISOString();

    const updateUserDto: UpdateUserDto = { username: 'newuser' };
    const expectedResult = {
      id: 1,
      username: 'newuser',
      pass_hash: 'hashedPassword',
      created_at: now, // Use string here
      updated_at: now, // Use string here
      clients: [],
      projects: [],
      activities: []
    }


    mockUsersService.updateOneUser.mockImplementation((id: number, dto: UpdateUserDto) => ({
      id: 1,
      username: dto.username,
      pass_hash: 'hashedPassword',
      created_at: new Date(now), // Use string here
      updated_at: new Date(now), // Use string here
      clients: [],
      projects: [],
      activities: []
    }));

    return request(app.getHttpServer())
      .patch('/users/1')
      .send(updateUserDto)
      .expect(200)
      .expect(expectedResult);
  });

  it('should return 400 for invalid user ID', async () => {
    return request(app.getHttpServer())
      .patch('/users/invalid-id')
      .send({ username: 'newuser' })
      .expect(400);
  });
});