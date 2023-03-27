import { AvailableService } from '@app/common/enum/available-service.enum';
import { BadRequestException, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { mockClientProxy } from '../__mocks__/client-proxy';
import { mockUserRepository } from '../__mocks__/user.repository';
import { User } from '../entities/user.entity';
import { USER_REPOSITORY } from '../user.provider';
import { UserService } from '../user.service';
import { createdUserStub, errorUserStub, userStub } from './stubs/user.stub';
describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        Logger,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: AvailableService.NOTIFICATION_SERVICE,
          useValue: mockClientProxy,
        },
      ],
    }).compile();
    service = app.get(UserService);
    repository = app.get(USER_REPOSITORY);
  });
  describe('getHello', () => {
    it('should return hello message', () => {
      expect(service.getHello()).toBe('Hello World from user service!');
    });
  });

  describe('create', () => {
    it('should call database create function and push new message to queue', async () => {
      await service.create(userStub());
      expect(mockClientProxy.emit).toBeCalled();
      expect(repository.save).toHaveBeenCalledWith(userStub());
    });
    it('should return the appropriate result', async () => {
      const result = await service.create(userStub());
      expect(result).toMatchObject(createdUserStub());
    });
    it('should throw bad request error', async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await service.create(errorUserStub());
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
