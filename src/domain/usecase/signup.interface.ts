export interface SignUp {
  execute(input: SignUp.Input): Promise<SignUp.Output>;
}
export namespace SignUp {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
