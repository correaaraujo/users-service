import { IUserProfile } from './interfaces/IUserProfile';
import { IUser } from '@domain/model/interfaces/IUser'


export default class User implements IUser {
    id: string
    createdAt: Date
    updatedAt: Date
    profileId: String
    UserProfile: IUserProfile[]

    constructor(public name: string,
        public email: string,
        public password: string,
        public status: string,
        public type: string) {
    }
}