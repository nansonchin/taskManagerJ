import { useState } from "react";
import type { IssueFormData } from "../type/issue";

export function IssueForm(){
    const [formData,setFormData] = useState<IssueFormData>({
        title:"",
        description:"",
        assignee:"",
        difficulty:3,
        dueDate:null
    })
    return (
        <form>
            <input
                value={formData.title}
                onChange={(e)=>{
                    setFormData({
                        ...formData,
                        title:e.target.value
                    })
                }}
            />
        </form>
    )
}