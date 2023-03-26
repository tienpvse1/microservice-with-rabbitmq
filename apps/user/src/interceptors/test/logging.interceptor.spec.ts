import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { LoggingInterceptor } from '../logging.interceptor';

describe('LoggingInterceptor', () => {
  let loggingInterceptor: LoggingInterceptor;
  const exampleUrl = 'https://google.com';
  const mockLogger = {
    debug: jest.fn(),
  };
  const nextFn = {
    handle: jest.fn().mockReturnThis(),
    pipe: jest.fn().mockImplementation(() => {
      mockLogger.debug();
      return of(exampleUrl);
    }),
  };

  const mockContext = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [Logger, LoggingInterceptor],
    })
      .overrideProvider(Logger)
      .useValue(mockLogger)
      .compile();
    loggingInterceptor = module.get(LoggingInterceptor);
  });

  it('should define the logger', () => {
    expect(loggingInterceptor).toBeDefined();
  });
  it('should log with debug method', () => {
    (
      mockContext.switchToHttp().getRequest as jest.Mock<any, any>
    ).mockReturnValue({
      url: exampleUrl,
    });
    loggingInterceptor.intercept(mockContext as any, nextFn as any);
    jest.setTimeout(3000);
    expect(mockLogger.debug).toHaveBeenCalled();
    expect(mockContext.switchToHttp).toBeCalled();
    expect(mockContext.switchToHttp().getRequest).toBeCalled();
    expect(nextFn.handle).toHaveBeenCalled();
    expect(nextFn.pipe).toHaveBeenCalled();
  });
});
