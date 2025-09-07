import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

export class LoginInputDTO {
  @ApiProperty({ example: 'johndoe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123' })
  @IsString()
  password: string;
}

export class LoginOutputDTO {
  @ApiProperty()
  @IsObject()
  user: UserEntity;

  @ApiProperty({ example: 'fake-token' })
  @IsString()
  token: string;
}
