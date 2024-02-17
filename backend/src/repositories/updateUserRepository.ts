import { User } from "../models";

type UpdateParams = {
  name?: string;
  email?: string;
  phone?: string;
}

export interface UpdateUserRepository {
  update(id: string, data: UpdateParams): Promise<User>;
}