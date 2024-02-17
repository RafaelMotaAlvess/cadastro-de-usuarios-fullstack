export interface FindByUserEmailRepository {
  findByEmail(email: string): Promise<boolean>;
}