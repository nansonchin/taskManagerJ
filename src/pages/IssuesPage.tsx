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
  const [isCreateForm, setIsCreateForm] = useState(false);
  const [edittingIssueId, setEdittingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const loadIssues = async () => {
      try {
        const result = await fetchIssues();
        console.log(result.todos);
        setIssues(
          result.todos.map((apiIssue: ApiTodo) => transformIssue(apiIssue)),
        );
        setIsLoading(false);
      } catch (error: any) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    };

    loadIssues();
  }, []);

  const handleFormSubmit = (formData: IssueFormData, issueId?: number) => {
    if (issueId) {
      setIssues(prev=>
        prev.map((issue)=>{
          if(issue.id===issueId){
            return{
              ...issue,
              ...formData
            }
          }
          return issue;
        })
      )
      setIsCreateForm(false);
      setEdittingId(null)

    } else {
      const newIssue: Issue = {
        id: Date.now(),
        ...formData,
        status: "To-do",
      };
      setIssues(prev=>[...prev, newIssue]);
      setIsCreateForm(false);
    }
  };

  const handleEditIssue = (issueId: number) => {
    setEdittingId(issueId);
    console.log("Id", issueId);

    if (!issueId) {
      return;
    }
  };

  const handleStatusChange = (issueId: number) => {
    const issue = issues.find((data) => data.id === issueId);

    if (!issue) {
      return;
    }

    const nextStatus = getNextStatus(issue.status);

    setIssues(prev=>
      prev.map((data) => {
        if (data.id === issueId) {
          return {
            ...data,
            status: nextStatus,
          };
        }
        return data;
      }),
    );
  };

  const handleDeleteIssue=(issueId:number)=>{
    setIssues((prev)=> prev.filter(((item)=>item.id!==issueId)))
  }

  const closeForm =() =>{
    setEdittingId(null)
      setIsCreateForm(false);

  }
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if(issues.length === 0){
    return <div>No Issues Yet</div>
  }

  const issueToEdit = edittingIssueId
    ? issues.find((issue) => issue.id === edittingIssueId)
    : undefined;

  const handleSearch= (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(e.target.value)
    const searchText = (e.target.value)

    const filteredIssues = issues.filter((issue)=>{
      if(issue.title.includes(e.target.value)){
        return issue.title
      }
    })
      setIssues(filteredIssues)
      if(e.target.value.trim()===""){
        
      }

  }
  return (
    <div>
      <div>
        <div>
          Search:
          <input
            value={searchTerm}
            onChange={(e)=>{
              handleSearch(e)
            }}
          />
        </div>
        <button onClick={() => setIsCreateForm((prev) => !prev)}>
          Create Form
        </button>
        {(isCreateForm ||
          edittingIssueId!==null) && (
            <div>
              <button onClick={closeForm}>Cancel</button>
              <IssueForm
                onSubmit={handleFormSubmit}
                issueToEdit={issueToEdit}
              />
            </div>
          )}
      </div>
      <IssueList
        issues={issues}
        onIssueCardClick={handleStatusChange}
        onIssueCardEdit={handleEditIssue}
        onIssueCardDelete={handleDeleteIssue}
      />
    </div>
  );
}
