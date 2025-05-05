import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create_user_dto';
import UpdateUserDto from './dto/update_user_dto';
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

    async updateOneUser(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (dto.username) {
            user.username = dto.username;
        }

        if (dto.password) {
            const hash = await bcrypt.hash(dto.password, 10);
            user.pass_hash = hash;
        }

        try {
            return this.usersRepo.save(user);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error(`Failed to update user with ID ${id}`);
        }
    }
}
