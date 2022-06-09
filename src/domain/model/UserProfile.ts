import { IUserProfile } from './interfaces/IUserProfile';
import { IUser } from './interfaces/IUser';

export class UserProfile implements IUserProfile {
    id: string;
    user: IUser;
    profile: IProfile;
}