
export class InjectionKeys {
  // Facades
  static readonly UserFacade = Symbol.for("UserFacade");

  // Repositories
  static readonly UserRepository = Symbol.for("UserRepository");
  static readonly UserSessionRepository = Symbol.for("UserSessionRepository");


  static readonly HttpClient = Symbol.for("HttpClient");

  static readonly RouterConfig = Symbol.for('RouterConfig');

  //Factories
  static readonly StorageFactory = Symbol.for("StorageFactory");

  //services
  static readonly AuthorizationService = Symbol.for("AuthorizationService");
}