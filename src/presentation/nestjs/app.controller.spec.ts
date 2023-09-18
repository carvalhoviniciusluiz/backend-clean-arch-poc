import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            signUp: jest.fn()
          }
        },
        {
          provide: 'SignUp',
          useValue: jest.fn()
        }
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const output = await appController.signUp({
        email: 'email',
        password: 'password'
      });
      expect(output).toBeUndefined();
    });
  });
});
