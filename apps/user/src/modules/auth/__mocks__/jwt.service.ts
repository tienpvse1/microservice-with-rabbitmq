export const mockJwtService = {
  verify: jest.fn(),
  sign: jest.fn().mockReturnValue('token'),
};
