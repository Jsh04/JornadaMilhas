import { injectable } from "inversify";
import type IStorageRepository from "../../interfaces/IStorageRepository";

@injectable()
export default class LocalStorageRepository<T> implements IStorageRepository<T>{

    private readonly localStorage: Storage;

    constructor(){
        this.localStorage = window.localStorage;
    }

    setItem<T>(key: string, obj: T): void {
        try {
            const serialized = JSON.stringify(obj);
            localStorage.setItem(key, serialized)

        } catch (error) {
            throw new Error("Falha ao salvar item no localStorage");
        }
        
    }

    removeItem(key: string): void {
         this.localStorage.removeItem(key);
    }

    clear(): void {
        this.localStorage.clear();
    }

    hasItem(key: string): boolean {
        const item = this.localStorage.getItem(key);

        return  item !== null || item !== 'null';
    }


    getItem(key: string): T | null{
        try {
            const item = this.localStorage.getItem(key);
            if (!item || item === 'null' || item === 'undefined') 
                return null;
            
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Erro ao recuperar item ${key}:`, error);
            return null;
        }
    }

}