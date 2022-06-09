import { errors } from 'celebrate';

import express from 'express'
import { Server as HttpServer } from 'node:http'
import swaggerUi from 'swagger-ui-express'
import 'dotenv/config'
import { container } from 'tsyringe'
import * as swaggerDoc from '../../swagger.json'
import Logger from '@infra/Logger/Logger'
import ExitStatus from '@shared/enum/ExitStatus'
import HttpLogger from '@infra/HttpLogger/HttpLogger'
import HealthCheckController from "./controllers/HealthcheckController";
import "dotenv/config";
import morgan from "morgan";
import ExampleController from "./controllers/UserController";
import { inject, injectable } from "tsyringe";
import UserController from './controllers/UserController'

@injectable()
export default class Server {
    app: express.Application;
    readonly logger = container.resolve(Logger)

    constructor(
        private userController: UserController,
        private healthcheckController: HealthCheckController
    ) {
        this.app = express();
        this.app.use(express.json())
        this.setupHttpLogger()
        this.setupRoutes()
        this.setupUnhandledOperations()
        this.app.use(errors())
    }

    private readonly setupHttpLogger = (): void => {
        this.app.use(HttpLogger)
    }

    setupApplicationLogger = () => {
        this.app.use(morgan(function (tokens, req, res) {
            const msg = [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                tokens['response-time'](req, res), 'ms',
            ].join(' ');
            this.logger.http(msg);
            return null;
            // return msg;
        })
        );
    }

    private readonly setupRoutes = (): void => {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
        this.app.use('/api/v1/healthcheck', this.healthcheckController.router)
        this.app.use('/api/v1/users', this.userController.router)
    }

    /**
     * Handles unhandledRejection and uncaughtException events.
     */
    private readonly setupUnhandledOperations = (): void => {
        process.on('unhandledRejection', (reason, promise) => {
            this.logger.error(`App exiting due to an unhandled promise: ${String(promise)} and reason ${String(reason)}`)
            throw reason
        })
        process.on('uncaughtException', (error) => {
            this.logger.error(`App exiting due to an uncaught error: ${String(error)}`)
            process.exit(ExitStatus.FAILURE)
        })
    }

    /**
     * Configures a gracefull shutdown whenever the server crash
     * @param server - The server instance.
     */
    static readonly setupGracefulShutdown = (server: HttpServer): void => {
        const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
        exitSignals.forEach((signal: string) => {
            process.on(signal, () => {
                //logger.info(`Closing server connections due an ${signal} command...`)
                // TODO: Close DB and other connections
                server.close((serverError) => {
                    if (serverError) {
                        //logger.error('An unexpected error ocurred while trying to shut down...')
                        //logger.error(String(serverError))
                        process.exit(ExitStatus.FAILURE)
                    } else {
                        //logger.info('Server connections closed successfully!!!')
                        process.exit(ExitStatus.SUCCESS)
                    }
                })
            })
        })
    }
}
