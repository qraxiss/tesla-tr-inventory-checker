import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IsUserLoggedResponseDto } from 'src/auth/dto/check.dto';
import { JwtAuth } from 'src/auth/decorators/jwt.decorator';
import { LogService } from 'src/log/log.service';
import { LogMethod } from 'src/log/decorator/log.decorator';
import { ResponseDto } from 'src/error/response.dto';
import { CatchError } from 'src/error/catch-error.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private logService: LogService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: LoginResponseDto
    })
    @CatchError()
    async login(@Request() req, @Body() loginDto: LoginDto) {
        return this.authService.login(req.user);
    }

    @JwtAuth()
    @Get('check')
    @ApiOperation({ summary: 'Check is user logged succesfully.' })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: IsUserLoggedResponseDto
    })
    @LogMethod()
    @CatchError()
    async check(@Request() req) {
        return {
            status: !!req.user
        }
    }
}