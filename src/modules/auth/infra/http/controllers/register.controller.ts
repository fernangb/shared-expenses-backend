import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterInputDTO } from '../dtos/register.dto';
import { RegisterUseCase } from '../../../application/use-cases/register.use-case';
import { BaseErrorOutput } from '../../../../../shared/errors/base.error';
@Controller('auth')
@ApiTags('Auth')
export class RegisterController {
  constructor(private readonly useCase: RegisterUseCase) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: BaseErrorOutput,
  })
  async login(@Body() dto: RegisterInputDTO) {
    return this.useCase.handle(dto);
  }
}
