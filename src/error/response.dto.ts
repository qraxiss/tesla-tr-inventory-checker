// src/error/response.interface.ts
import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from './error.enum';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
export class ResponseDto {
    @ApiProperty({ type: Boolean })
    @IsBoolean()
    status: boolean;

    @ApiProperty({ type: Object })
    @IsObject()
    errorCode: ErrorCode;

    @ApiProperty({ type: String })
    @IsString()
    message: string;

    @ApiProperty({ type: Object })
    @IsObject()
    @IsOptional()
    data: any | null | undefined;
}


export class ErrorCodeDto {
    @ApiProperty({ enum: ErrorCode })
    ERROR: ErrorCode = ErrorCode.SUCCESS
}  