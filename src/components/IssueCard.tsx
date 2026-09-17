import type { Issue } from "../type/issue"

export type IssueCardProps={
    issue:Issue
      onIssueCardClick :(issueId:number)=>void;
}

export function IssueCard({issue,  onIssueCardClick}:IssueCardProps){
    return(
        <div onClick={()=>onIssueCardClick(issue.id)}>
            {issue.title}
        </div>
    )
}