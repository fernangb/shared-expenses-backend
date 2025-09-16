import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmUserRepository } from '../../database/typeorm/typeorm-user.repository';
import HashService from 'src/module/shared/module/hash/hash.service';
import { UserEntity } from '../entity/user.entity';
import { RegisterRequestDTO, RegisterResponseDTO } from '../dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(
    private readonly repository: TypeOrmUserRepository,
    private readonly hashService: HashService,
  ) {}

  async execute({
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  }: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const hasUserByEmail = await this.repository.findOneByEmail(email);

    if (hasUserByEmail) throw new BadRequestException('User Already exists');

    const hasUserByPhone = await this.repository.findOneByPhone(phone);

    if (hasUserByPhone) throw new BadRequestException('User Already exists');

    if (password !== confirmPassword)
      throw new BadRequestException('Password not match');

    const hashedPassword = await this.hashService.createHash(password);

    const user = new UserEntity({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    await this.repository.save(user);
  }
}
