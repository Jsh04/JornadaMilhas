export default interface IStorageRepository<T>{
    setItem<T>(key: string, obj: T): void;

    removeItem(key: string): void;

    clear(): void;    

    hasItem(key: string): boolean; 

    getItem(key: string): T | null
}