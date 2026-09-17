import { useEffect, useState } from "react";
import fetchIssues from "../api/fetchIssues";
import getNextStatus from "../utils/getNextStatus";
import type { ApiTodo, Issue, IssueFormData } from "../type/issue";
import { transformIssue } from "../utils/transformIssue";
import IssueList from "../components/IssueList";
import { IssueForm } from "../components/IssueForm";


export default function IssuesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateForm,setIsCreateForm] = useState(false)
  const [edittingIssueId,setEdittingId] = useState<number |null>(null)


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

  const handleCreateIssue=(formData:IssueFormData)=>{
    const newIssue:Issue = {
      id:Date.now(),
      ...formData,
      status:"To-do"
    }
    setIssues([...issues,newIssue])
    setIsCreateForm(false)
  }

  const handleEditIssue = (issueId:number)=>{
    setEdittingId(issueId)
    console.log("Id",issueId)

    if(!issueId){
      return
    }

  }
  
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

    const issueToEdit = edittingIssueId? issues.find((issue)=>issue.id === edittingIssueId):undefined
  return (
    <div>
      <div>
        <button onClick={()=>setIsCreateForm((prev)=>!prev)}>
          Create Form
        </button>
        {
          isCreateForm || edittingIssueId &&
         <div>
           <button onClick={()=>setIsCreateForm(false)}>
            Cancel
          </button>
          <IssueForm onCreate={handleCreateIssue} issueToEdit={issueToEdit}/>
          </div>
        }
      </div>
      <IssueList issues={issues} onIssueCardClick={handleStatusChange} onIssueCardEdit={handleEditIssue}/>
    </div>
  );
}

