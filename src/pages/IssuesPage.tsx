import { useEffect, useState } from "react";
import fetchIssues from "../api/fetchIssues";
import getNextStatus from "../utils/getNextStatus";


export default function IssuesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const loadIssues = async () => {
      try {
        const result = await fetchIssues();
        console.log(result.todos);
        setIssues(result.todos);
        setIsLoading(false);
      } catch (error: any) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    };

    loadIssues();
  }, []);

  
  const handleStatusChange = (issueId) =>{
    const issue = issues.find((data)=>data.id === issueId)
    const nextStatus = getNextStatus(issue.status)

    setIssues(
      issues.map((data)=>{
        if(data.id === issueId){
          return{
            ...data,
            status:nextStatus
          }
        }
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
      {issues.map((issue) => {
        console.log("issue", issue);
        return <div>{issue.todo}</div>;
      })}
    </div>
  );
}
