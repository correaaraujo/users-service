import { ProfileRequest } from './ProfileRequest';
import User from '@domain/model/User'
import { Request, Response, NextFunction } from 'express';

export class UserRequest {
    public name: string
    public email: string
    public userName: string
    public password: string
    public type: string
    public profiles: ProfileRequest[]

    constructor(data: any) {
        this.name = data.name
        this.email = data.email
        this.userName = data.userName
        this.password = data.password
        this.type = data.type
    }

    toDomain = (): User =>
        new User(
            this.name,
            this.email,
            this.userName,
            this.password,
            this.type)

}