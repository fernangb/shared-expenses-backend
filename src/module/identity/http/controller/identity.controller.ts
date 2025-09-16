import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterService } from '../../core/service/register.service';
import { RegisterRequestDTO } from '../../core/dto/register.dto';
import { LoginRequestDTO } from '../../core/dto/login.dto';
import { LoginService } from '../../core/service/login.service';

@Controller('identity')
@ApiTags('Identity')
export class IdentityController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  async register(@Body() dto: RegisterRequestDTO) {
    return this.registerService.execute(dto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login into the API' })
  @ApiResponse({
    status: 201,
    description: 'Login response',
  })
  async login(@Body() authDto: LoginRequestDTO) {
    return this.loginService.execute(authDto);
  }
}
