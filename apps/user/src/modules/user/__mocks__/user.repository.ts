import { createdUserStub } from '../tests/stubs/user.stub';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

export const mockUserRepository = {
  save: jest.fn().mockImplementation((dto: CreateUserDto) => {
    if (!dto.email) throw new BadRequestException();
    return Promise.resolve(createdUserStub());
  }),
};
