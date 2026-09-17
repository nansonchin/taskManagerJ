export type Status = 
    | "To-do"
    | "In-progress"
    | "Done"


export type Issue = {
    id:number;
    title:string;
    description:string;
    asisignee:string;
    status:Status;
    dueDate:Date;
    difficulty:number;
}