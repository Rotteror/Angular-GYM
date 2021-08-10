export interface IUser {
    _id: string,
    email: string,
    username: string,
    gender: string,
    programs?: string[],
    accessToken: string,
}