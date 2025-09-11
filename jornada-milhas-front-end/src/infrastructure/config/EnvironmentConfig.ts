import { injectable } from "inversify";

export interface EnvVariables {
  API_URL: string;
  APP_ENV: 'development' | 'staging' | 'production';
  APP_VERSION: string;
  API_TIMEOUT: number;
  ENABLE_DEBUG: boolean;
}

export type EnvKey = keyof EnvVariables;

export type EnvValue = EnvVariables[EnvKey];

declare global {
  interface Window {
    __ENV__?: Partial<EnvVariables>;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_API_TIMEOUT?: string;
  readonly VITE_ENABLE_DEBUG?: string;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}

@injectable()
export default class EnvironmentConfig {
  private readonly config: EnvVariables;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EnvVariables {

    if (typeof window !== 'undefined' && window.__ENV__) {
      return {
        ...this.getDefaultConfig(),
        ...window.__ENV__
      };
    }

    return {
      API_URL: this.getEnvVar('VITE_API_URL', '__API_URL__', 'http://localhost:3000/api'),
      APP_ENV: this.getEnvVar('VITE_APP_ENV', '__APP_ENV__', 'development') as EnvVariables['APP_ENV'],
      APP_VERSION: this.getEnvVar('VITE_APP_VERSION', '__APP_VERSION__', '1.0.0'),
      API_TIMEOUT: this.parseNumber(this.getEnvVar('VITE_API_TIMEOUT', '__API_TIMEOUT__', '30000'), 30000),
      ENABLE_DEBUG: this.parseBoolean(this.getEnvVar('VITE_ENABLE_DEBUG', '__ENABLE_DEBUG__', 'false')),
    };
  }

  private getDefaultConfig(): EnvVariables {
    return {
      API_URL: this.getDefaultApiUrl(),
      APP_ENV: 'development',
      APP_VERSION: '1.0.0',
      API_TIMEOUT: 30000,
      ENABLE_DEBUG: true,
    };
  }

  private getDefaultApiUrl(): string {
    if (typeof window === 'undefined')
      return '/api';

    const { protocol, hostname, port } = window.location;

    if (hostname === 'localhost' || hostname === '127.0.0.1')
      return 'http://localhost:3001/api';

    if (hostname.includes('app.') || hostname.includes('frontend.')) {
      const apiHostname = hostname.replace(/^(app\.|frontend\.)/, 'api.');
      return `${protocol}//${apiHostname}/api`;
    }

    return `${protocol}//${hostname}${port ? `:${port}` : ''}/api`;
  }

  private getEnvVar(viteVar: keyof ImportMetaEnv, placeholder: string, defaultValue: string): string {

    if (import.meta.env[viteVar] && import.meta.env[viteVar] !== placeholder)
      return import.meta.env[viteVar] as string;

    if (import.meta.env[viteVar] === placeholder)
      return defaultValue;

    return defaultValue;
  }

  private parseNumber(value: string, defaultValue: number): number {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  private parseBoolean(value: string): boolean {
    return value.toLowerCase() === 'true';
  }

  public get<K extends EnvKey>(key: K): EnvVariables[K] {
    return this.config[key];
  }

  public isDevelopment(): boolean {
    return this.config.APP_ENV === 'development';
  }

  public isStaging(): boolean {
    return this.config.APP_ENV === 'staging';
  }

  public isProduction(): boolean {
    return this.config.APP_ENV === 'production';
  }

  public getApiUrl(endpoint: string = ''): string {
    const baseUrl = this.config.API_URL.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');
    return cleanEndpoint ? `${baseUrl}/${cleanEndpoint}` : baseUrl;
  }

  public getAll(): Readonly<EnvVariables> {
    return { ...this.config };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      new URL(this.config.API_URL);
    } catch {
      errors.push('API_URL deve ser uma URL válida');
    }

    if (this.config.API_TIMEOUT <= 0) 
      errors.push('API_TIMEOUT deve ser maior que 0');
    

    // Validar versão
    if (!this.config.APP_VERSION.match(/^\d+\.\d+\.\d+/)) {
      errors.push('APP_VERSION deve seguir o formato semver (x.y.z)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Método para debug (apenas em desenvolvimento)
  public debug(): void {
    if (this.isDevelopment() && this.config.ENABLE_DEBUG) {
      console.group('🔧 Configurações de Ambiente');
      console.table(this.config);
      console.groupEnd();

      const validation = this.validate();
      if (!validation.isValid) {
        console.warn('⚠️ Problemas na configuração:', validation.errors);
      }
    }
  }
}
