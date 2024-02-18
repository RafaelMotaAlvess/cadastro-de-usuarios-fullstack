import { User } from "../models";

export interface FindByUserEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}