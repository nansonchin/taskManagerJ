import type { Issue } from "../type/issue"
import { IssueCard } from "./IssueCard"

export type IssueListProps={
    issues:Issue[]
    onIssueCardClick :(issueId:number)=>void;
    onIssueCardEdit:(issueId:number)=>void
    onIssueCardDelete:(issueId:number)=>void;
}

export default function IssueList({issues,onIssueCardClick,onIssueCardEdit,onIssueCardDelete}:IssueListProps){
    return(
        <div>
            {
                issues.map((issue)=>{
                    return(
                        <IssueCard key={issue.id} issue={issue} 
                            onIssueCardClick={onIssueCardClick}
                            onIssueCardEdit={onIssueCardEdit}
                            onIssueCardDelete={onIssueCardDelete}
                        />
                    )
                })
            }
        </div>
    )
}