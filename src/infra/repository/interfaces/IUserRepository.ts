import { User } from '@domain/model/User';

export interface IUserRepository {
    create(user: User)
    update(user: User)
    delete(user: User)
    find(user: User)
    list()
}