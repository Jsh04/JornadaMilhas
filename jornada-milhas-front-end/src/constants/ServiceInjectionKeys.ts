
export class InjectionKeys {
  // Facades
  static readonly UserFacade = Symbol.for("UserFacade");

  // Repositories
  static readonly UserRepository = Symbol.for("UserRepository");


  static readonly HttpClient = Symbol.for("HttpClient");
}