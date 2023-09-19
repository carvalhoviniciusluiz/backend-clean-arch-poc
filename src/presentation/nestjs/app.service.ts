import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter } from 'stream';
import { SignUp } from '~/domain/usecase';
import { SignUpInput } from './input';
import { UserCreatedEvent } from './event';

@Injectable()
export class AppService {
  constructor(
    @Inject('SignUp')
    private readonly usecase: SignUp,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async signUp(input: SignUpInput): Promise<SignUp.Output> {
    const output = await this.usecase.execute({
      email: input.email,
      password: input.password
    });
    this.eventEmitter.emit('user.created', new UserCreatedEvent({
      id: output.id,
      email: output.email
    }));
    return output;
  }
}
