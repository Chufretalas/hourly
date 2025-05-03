import { Crud, CrudController, Override } from '@dataui/crud';
import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/create_user_dto';
import User from './user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User
  },
  routes: {
    only: ["getManyBase", "getOneBase", "deleteOneBase"]
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(readonly service: UsersService) {
  }

  @Post()
  async createOneUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.createOneUser(dto)
  }

  //TODO: make an update one endpoint
}
