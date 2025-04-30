import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { ResponseDto } from 'src/error/response.dto';

export class LoginDto {
    @ApiProperty({
        example: 'user@mail.com',
        description: 'User email address',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123!',
        description: 'User password',
    })
    @IsString()
    password: string;
}

export class LoginResponseDto extends ResponseDto {
    @ApiProperty({ type: LoginDto })
    @IsObject()
    @IsOptional()
    data: LoginDto | null
}