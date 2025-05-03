import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Client from './client.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private usersRepository: Repository<Client>,
    ) { }
}
