import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export default class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    username?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    password?: string;
}