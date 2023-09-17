export class UserTypeOrm {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly passwordHashed: string,
    readonly salt: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly deletedAt?: Date
  ) {}
}
