import { SignUp } from "../../domain/usecase";

export interface UsecaseFactory {
  createSignUp (): SignUp;
}
