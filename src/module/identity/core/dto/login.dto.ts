import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({ example: 'johndoe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123' })
  @IsString()
  password: string;
}

export class LoginResponseDTO {
  @ApiProperty({ example: 'fake-token' })
  @IsString()
  token: string;
}
