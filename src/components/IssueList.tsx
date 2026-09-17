import type { Issue } from "../type/issue"
import { IssueCard } from "./IssueCard"

export type IssueListProps={
    issues:Issue[]
    onIssueCardClick :(issueId:number)=>void;
}

export default function IssueList({issues,onIssueCardClick}:IssueListProps){
    return(
        <div>
            {
                issues.map((issue)=>{
                    return(
                        <IssueCard issue={issue} onIssueCardClick={()=>onIssueCardClick(issue.id)}/>
                    )
                })
            }
        </div>
    )
}