import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, CreateUserResponseDto } from 'src/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateUserResponseDto extends PartialType(CreateUserResponseDto) { }