export interface IUser {
    id: string
    name: string
    email: string
    password: string
    status: string
    type: string
    createdAt: Date
    updatedAt: Date
    profileId: String
    UserProfile: IUserProfile[]
}