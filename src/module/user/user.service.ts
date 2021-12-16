import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findByEmail = await this.findOneByEmail(createUserDto.email)    
    if(findByEmail) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: `Já existe um usário cadastrado com essse email: ${createUserDto.email}`
      }
    }
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.findOneById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
