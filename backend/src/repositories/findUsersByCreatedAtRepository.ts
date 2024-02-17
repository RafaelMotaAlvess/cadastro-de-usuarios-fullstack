import { User } from "../models";

export interface FindUsersByCreatedAtRepository {
  findUsersByCreatedAt(date: Date): Promise<User[]>;
}