import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterService } from '../../core/services/register.service';
import { RegisterRequestDTO } from '../../core/dto/register.dto';

@Controller('identity')
@ApiTags('Identity')
export class IdentityController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  async register(@Body() dto: RegisterRequestDTO) {
    return this.registerService.handle(dto);
  }
}
