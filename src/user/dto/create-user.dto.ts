import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { ResponseDto } from 'src/error/response.dto';

export class CreateUserDto {
    @ApiProperty({
        example: 'user@mail.com',
        description: 'User email address.',
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123!',
        description: 'User password (Min 6 char!)',
        minLength: 6,
        required: true
    })
    @IsString()
    @MinLength(6)
    password: string;
}


export class CreateUserResponseDto extends ResponseDto {
    @ApiProperty({ type: CreateUserDto })
    @IsObject()
    @IsOptional()
    data: CreateUserDto | null
}