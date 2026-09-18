export type Status = 
    | "To-do"
    | "In-progress"
    | "Done"


export type Issue = {
    id:number;
    title:string;
    description:string;
    assignee:string;
    status:Status;
    dueDate:Date |null;
    difficulty:number;
}

export type ApiTodo={
    id:number,
    todo:string;
    completed:boolean,
    userId:number
}

export type IssueFormData={
    title:string,
    description:string,
    assignee:string;
    difficulty:number;
    dueDate:Date | null;
}


export type FormErrorsMessage={
    title:string;
    description:string;
    difficulty:string;
}