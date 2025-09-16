import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmUserRepository } from '../../database/typeorm/typeorm-user.repository';
import HashService from 'src/module/shared/module/hash/hash.service';
import TokenService from 'src/module/shared/module/token/token.service';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly repository: TypeOrmUserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async execute({
    email,
    password,
  }: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.repository.findOneByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const isValidPassword = await this.hashService.compareHash(
      password,
      user.password,
    );

    if (!isValidPassword) throw new BadRequestException('Invalid credentials');

    const token = this.tokenService.createToken(user.id);

    return {
      token,
    };
  }
}
