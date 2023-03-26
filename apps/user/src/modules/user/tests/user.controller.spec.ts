import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Logger } from '@nestjs/common';
import { userStub } from './stubs/user.stub';
jest.mock('../user.service');
describe('UserController', () => {
  let userController: UserController;
  let service: UserService;
  const mockOriginalMessage = { message: 'this is the dummy message' };
  const mockRmqContext = {
    getChannelRef: jest.fn().mockReturnValue({
      ack: jest.fn(),
    }),
    getMessage: jest.fn().mockImplementation(() => mockOriginalMessage),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, Logger],
    }).compile();

    userController = app.get<UserController>(UserController);
    service = app.get(UserService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userController.getHello()).toBe('Hello World from user service!');
    });
  });
  describe('create', () => {
    it('should call the create function from service layer', async () => {
      await userController.create(userStub());
      expect(service.create).toBeCalled();
    });
  });

  describe('sum', () => {
    it('should call appropriate functions', () => {
      userController.sum([1, 2, 3, 4, 5], mockRmqContext as any);
      const channelRef = mockRmqContext.getChannelRef();
      expect(mockRmqContext.getChannelRef).toBeCalled();
      expect(mockRmqContext.getMessage).toBeCalled();
      expect(channelRef.ack).toHaveBeenCalledWith(mockOriginalMessage);
    });
    it('should return the sum of array of numbers', () => {
      const sum = userController.sum([1, 2, 3, 4, 5], mockRmqContext as any);
      expect(sum).toBe(15);
    });
  });
});
