export class PhoneAlreadyExistsError extends Error {
  constructor() {
    super("Telefone já cadastrado!");
  }
}