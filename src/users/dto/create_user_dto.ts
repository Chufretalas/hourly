import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    password: string;
}