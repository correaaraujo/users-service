import { UserRepository } from '@infra/repository/UserRepository';
import User from './../model/User';
import { autoInjectable, inject, injectable } from 'tsyringe';
import { IUserRepository } from '@infra/repository/interfaces/IUserRepository';

@autoInjectable()
export default class UserService {
    constructor(
        private repository: UserRepository) {
    }

    create = (user: User) => this.repository.create(user);
    update = (user: User) => this.repository.update(user);
    delete = (user: User) => this.repository.delete(user);
    find = (user: User) => this.repository.find();
    list = () => this.repository.list();
}