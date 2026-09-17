import { useEffect, useState } from "react";
import fetchIssues from "../api/fetchIssues";
import getNextStatus from "../utils/getNextStatus";
import type { ApiTodo, Issue } from "../type/issue";
import { transformIssue } from "../utils/transformIssue";
import IssueList from "../components/IssueList";


export default function IssuesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const loadIssues = async () => {
      try {
        const result = await fetchIssues();
        console.log(result.todos);
        setIssues(result.todos.map((apiIssue:ApiTodo)=> transformIssue(apiIssue)));
        setIsLoading(false);
      } catch (error: any) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    };

    loadIssues();
  }, []);

  
  const handleStatusChange = (issueId:number) =>{
    const issue = issues.find((data)=>data.id === issueId)

    if(!issue){
      return
    }

    const nextStatus = getNextStatus(issue.status)

    setIssues(
      issues.map((data)=>{
        if(data.id === issueId){
          return{
            ...data,
            status:nextStatus
          }
        }
          return data
      })
    )

  
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <IssueList issues={issues} onIssueCardClick={()=>handleStatusChange(issueId)}/>
    </div>
  );
}

