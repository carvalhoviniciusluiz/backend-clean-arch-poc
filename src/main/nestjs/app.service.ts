import { Inject, Injectable } from '@nestjs/common';
import { SignUp } from '~/domain/usecase';
import { SignUpInput } from './input';

@Injectable()
export class AppService {
  constructor(
    @Inject('SignUp')
    private readonly usecase: SignUp
  ) {}

  signUp(input: SignUpInput): Promise<SignUp.Output> {
    return this.usecase.execute({
      email: input.email,
      password: input.password
    });
  }
}
