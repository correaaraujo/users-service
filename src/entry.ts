import { Router } from 'express';
import { IUserRepository } from '@infra/repository/interfaces/IUserRepository';

import 'reflect-metadata'
import './shared/container/DependencyInjection'
import { Server as HttpServer } from 'node:http'
import { container } from 'tsyringe'
import "reflect-metadata"

import UserService from '@domain/services/UserService';
import { UserRepository } from '@infra/repository/UserRepository';

import Server from '@application/server'
import Logger from '@infra/Logger/Logger'
import UserController from '@application/controllers/UserController'
import DependencyInjection from '@shared/container/DependencyInjection'

const port = process.env.PORT
const logger = container.resolve(Logger)


void (async (): Promise<void> => {
    try {
        await DependencyInjection.setup()
        const server: HttpServer = container.resolve<Server>(Server).app.listen(port, () => {
            logger.info(`Server running on port ${port}!`)
        })
        Server.setupGracefulShutdown(server)
    } catch (error) {
        logger.error('An unexpected error prevented the server from starting up.')
        logger.error(String(error))
    }
})()
