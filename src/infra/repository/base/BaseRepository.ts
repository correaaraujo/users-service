import { PrismaClient } from "@prisma/client";
import { inject } from "tsyringe";

export class BaseRepository {
    public repository: PrismaClient;
    constructor(@inject('PrismaClient') prismaClient: PrismaClient) {
        this.repository = prismaClient

    }
}