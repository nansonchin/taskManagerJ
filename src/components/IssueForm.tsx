import { useState } from "react";
import type { IssueFormData } from "../type/issue";

export type IssueFormProps={
   title:string,
    description:string,
    assignee:string;
    difficulty:number;
    dueDate:Date | null;
}

export function IssueForm(){
    const [formData,setFormData] = useState<IssueFormData>()
    return (
        <form>
            <input
                value={formData.title}
                onChange={(e)=>{
                    setFormData({
                        ...formData,
                        title:formData.title
                    })
                }}
            />
        </form>
    )
}