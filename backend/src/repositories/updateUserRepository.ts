import { User } from "../models";

type UpdateParams = {
  name?: string;
  email?: string;
  phone?: string;
}

export interface UpdateUserRepository {
  update(data: UpdateParams): Promise<User>;
}