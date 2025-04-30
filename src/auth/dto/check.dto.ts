import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional } from 'class-validator';

import { ResponseDto } from 'src/error/response.dto';

export class IsUserLogged {
    @ApiProperty({
        example: true,
        description: 'Login status.',
    })
    @IsBoolean()
    status: boolean;
}

export class IsUserLoggedResponseDto extends ResponseDto {
    @ApiProperty({ type: IsUserLogged })
    @IsObject()
    @IsOptional()
    data: IsUserLogged
}