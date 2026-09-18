import { useEffect, useMemo, useState } from "react";
import fetchIssues from "../api/fetchIssues";
import getNextStatus from "../utils/getNextStatus";
import type { ApiTodo, Issue, IssueFormData } from "../type/issue";
import { transformIssue } from "../utils/transformIssue";
import IssueList from "../components/IssueList";
import { IssueForm } from "../components/IssueForm";
import { useIssue } from "../hooks/useIssues";

export default function IssuesPage() {

  const {issues,isLoading,isError,errorMessage, createIssue, updateIssue, changeIssueStatus, deleteIssue} = useIssue()

  const [isCreateForm, setIsCreateForm] = useState(false);
  const [edittingIssueId, setEdittingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter,setStatusFilter] = useState("All")
  
  const handleFormSubmit = (formData: IssueFormData, issueId?: number) => {
    if (issueId) {
      updateIssue(issueId,formData)
      setIsCreateForm(false);
      setEdittingId(null)

    } else {
     createIssue(formData)
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
  
  const filteredIssues =useMemo(()=>{
    return  issues.filter((issue)=>{
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || issue.status === statusFilter
    return matchesStatus && matchesSearch
  })
  },[issues,searchTerm,statusFilter])

  console.log("Issue Page Render")

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
        <div>
          <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value ="To-do">To-do</option>
            <option value= "Doing">Doing</option>
            <option value ="Done">Done</option>
          </select>
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
        issues={filteredIssues}
        onIssueCardClick={changeIssueStatus}
        onIssueCardEdit={handleEditIssue}
        onIssueCardDelete={deleteIssue}
      />
    </div>
  );
}
