import { Router } from 'express';
import { IUserRepository } from '@infra/repository/interfaces/IUserRepository';

import 'reflect-metadata'
import './shared/container/RegisterDependencyInjections'
import { Server as HttpServer } from 'node:http'
import { container } from 'tsyringe'
import "reflect-metadata"

import UserService from '@domain/services/UserService';
import { UserRepository } from '@infra/repository/UserRepository';

import Server from '@application/server'
import Logger from '@infra/Logger/Logger'
import UserController from '@application/controllers/UserController'

const port = process.env.PORT
const logger = container.resolve(Logger)

void (async (): Promise<void> => {
    try {
        container.register<UserController>(UserController, { useClass: UserController })
        container.register("IUserRepository", { useClass: UserRepository })
        container.register<UserService>(UserService, { useClass: UserService })

        container.register<Server>(Server, { useClass: Server })
        const server: HttpServer = container.resolve<Server>(Server).app.listen(port, () => {
            logger.info(`Server running on port ${port}!`)
        })
        Server.setupGracefulShutdown(server)
    } catch (error) {
        logger.error('An unexpected error prevented the server from starting up.')
        logger.error(String(error))
    }
})()
