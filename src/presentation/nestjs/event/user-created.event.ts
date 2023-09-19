interface CreateUserInput {
  id: string;
  email: string;
}

export class UserCreatedEvent {
  constructor(public readonly input: CreateUserInput) {}
}
