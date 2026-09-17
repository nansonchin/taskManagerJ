import type { Issue } from "../type/issue"

export type IssueCardProps={
    issue:Issue
      onIssueCardClick :(issueId:number)=>void;
      onIssueCardEdit:(issueId:number) =>void;
}

export function IssueCard({issue,  onIssueCardClick,onIssueCardEdit}:IssueCardProps){
    return(
        <div >
            <div>{issue.title}</div>
            <div>{issue.description}</div>
            <div>{issue.status}</div>
            <button onClick={()=>onIssueCardClick(issue.id)
                
            }>

                Change Status
            </button>
            <button onClick={()=>onIssueCardEdit(issue.id)}>
                Edit
            </button>
        </div>
    )
}