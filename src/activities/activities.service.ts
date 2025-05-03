import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Activity from './activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Activity)
        private usersRepository: Repository<Activity>,
    ) { }
}
