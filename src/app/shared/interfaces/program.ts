export interface IProgram {  
    _id: string,
    title: string,
    description: string,
    length: string,
    bodyFocus: string,
    averageDuration: string,
    daysPerWeek: string,
    followers:string[],
    owner: any,
}