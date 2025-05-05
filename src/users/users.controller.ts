import { Crud, CrudController, Override } from '@dataui/crud';
import { BadRequestException, Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import CreateUserDto from './dto/create_user_dto';
import User from './user.entity';
import { UsersService } from './users.service';
import UpdateUserDto from './dto/update_user_dto';

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

  @Patch(":id")
  async updateOneUser(@Param("id", new ParseIntPipe({ exceptionFactory: () => new BadRequestException('The user ID must be an integer.') })) id: number,
    @Body() dto: UpdateUserDto): Promise<any> {
    return this.service.updateOneUser(id, dto)
  }
}
