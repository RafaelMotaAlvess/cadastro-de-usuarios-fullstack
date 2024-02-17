import { User } from "../models";

type CreateParams = {
  name: string;
  email: string;
  phone: string;
}

export interface CreateUserRepository {
  create(data: CreateParams): Promise<User>;
}