import { UserRequest } from './../model/UserRequest';
import { UserSchema } from './../model/schemas/UserSchema';

import { Router } from "express";
import { autoInjectable, inject, injectable, registry } from "tsyringe";
import UserService from "@domain/services/UserService";
import Logger from "@infra/Logger/Logger";
import { celebrate, Joi, Segments, errors } from 'celebrate'


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
        this.router.get("/:id", this.findById);
        this.router.get("/", this.findAll);
        this.router.post("/", UserSchema, this.create);
        this.router.put("/", this.update);
        this.router.patch("/:id", this.update);
        this.router.delete("/:id", this.findAll);

    }

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