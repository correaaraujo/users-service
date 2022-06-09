import { UserRequest } from './../model/UserRequest';
import { UserSchema } from './../model/schemas/UserSchema';
import { Router } from "express";
import { autoInjectable, inject, injectable, registry } from "tsyringe";
import IUserService from "@domain/services/UserService"
import UserService from "@domain/services/UserService";
import { serialize } from "v8";
import Logger from "@infra/Logger/Logger";
import ILogger from "@infra/Logger/ILogger";
import User from '@domain/model/User';

@autoInjectable()
export default class UserController {
    public router: Router

    constructor(
        private logger: Logger,
        private service: UserService) {
        this.router = Router();
        this.init()
    }

    init = () => {
        this.addSchemaValidator()
        this.router.get("/:id", this.findById);
        this.router.get("/", this.findAll);
        this.router.post("/", this.create);
        this.router.put("/", this.update);
        this.router.patch("/:id", this.update);
        this.router.delete("/:id", this.findAll);

    }
    addSchemaValidator = async () =>
        this.router.use(
            async (req, res, next) => {
                await UserSchema().validateAsync(req.body)
                    .then(data => {
                        this.logger.info(data)
                        next()
                    }).catch(ex => {
                        this.logger.warn(ex)
                        res.status(400).send(ex.message)
                    })
            })

    create = async (req, res, next) => {
        let data = new UserRequest(req.body).toDomain()

        this.service.create(data)
            .then(data => {
                res.status(200).send(data)
            }).catch(ex => {
                this.logger.warn(ex.message)
                res.status(400).send(ex.message)
            })
    }

    update = async () => { }
    delete = async () => { }
    findById = async () => { }
    findAll = async () => { }
}