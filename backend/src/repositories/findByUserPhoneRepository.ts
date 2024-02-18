import { User } from "../models";

export interface FindByUserPhoneRepository {
  findByPhone(phone: string): Promise<User | null>;
}