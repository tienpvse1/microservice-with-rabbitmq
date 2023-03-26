import { createdUserStub } from '../tests/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createdUserStub),
  getHello: jest.fn().mockReturnValue('Hello World from user service!'),
});
