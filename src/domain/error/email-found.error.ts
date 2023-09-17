export class EmailFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EmailFoundError.name;
  }
}
