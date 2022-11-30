export interface IRepository<T, U> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    create(data: U): Promise<T>;
    update(id: number, data: U): Promise<boolean>;
    remove(id: number): Promise<boolean>;
}