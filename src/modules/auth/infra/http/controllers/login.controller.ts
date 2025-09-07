import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUseCase } from '../../../../../modules/auth/application/use-cases/login/login.use-case';
import { LoginInputDTO, LoginOutputDTO } from '../dtos/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login into the API' })
  @ApiResponse({
    status: 201,
    description: 'Login response',
    type: LoginOutputDTO,
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
  })
  async login(@Body() authDto: LoginInputDTO) {
    return this.loginUseCase.handle(authDto);
  }
}
