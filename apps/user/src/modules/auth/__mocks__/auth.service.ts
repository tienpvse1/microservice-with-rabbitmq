export const AuthService = jest.fn().mockReturnValue({
  verify: jest.fn().mockReturnValue({}),
  login: jest.fn().mockReturnValue({ token: 'random-token' }),
});
