import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create_user_dto';
import User from './user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {
        super(usersRepo)
    }

    async createOneUser(dto: CreateUserDto): Promise<User> {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = new User();
        user.username = dto.username;
        user.pass_hash = hash;
        return this.usersRepo.save(user);
    }
}
