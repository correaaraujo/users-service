import UserController from '@application/controllers/UserController';
import UserService from '@domain/services/UserService';
import { UserRepository } from '@infra/repository/UserRepository';
import { container } from 'tsyringe'
import Logger from '@infra/Logger/Logger'
import Server from '@application/server';


export default class DependencyInjection {

    static setup = async () => {

        container.register<UserController>(UserController, { useClass: UserController })
        container.register("IUserRepository", { useClass: UserRepository })
        container.register<UserService>(UserService, { useClass: UserService })
        container.register<Server>(Server, { useClass: Server })
    }
}
