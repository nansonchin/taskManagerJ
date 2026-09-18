import { use, useCallback, useEffect, useState } from "react";
import type { ApiTodo, Issue, IssueFormData } from "../type/issue";
import fetchIssues from "../api/fetchIssues";
import { transformIssue } from "../utils/transformIssue";
import getNextStatus from "../utils/getNextStatus";

export function useIssue(){
    const [ issues,setIssues] = useState<Issue[]>([])
    const [isLoading, setIsLoading]=useState(false);
    const [isError,setIsError]=useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    useEffect(()=>{
        setIsLoading(true)
        setIsError(false)

        const loadIssues = async()=>{
            try{
                const result = await fetchIssues();
                setIssues(
                    result.todos.map((apiIssue:ApiTodo)=> transformIssue(apiIssue))
                )
                setIsLoading(false)
            }catch(error:any){
                setIsError(true)
                setIsLoading(false)
                setErrorMessage(error.message)
            }
        }

        loadIssues()
    },[])

    const createIssue = (formData:IssueFormData) =>{
        const newIssue:Issue = {
            id:Date.now(),
            ...formData,
            status:"To-do"
        }

        setIssues((prev)=>[...prev,newIssue])
        
    }

    const updateIssue = (
        issueId:number,
        formData:IssueFormData,
    )=>{
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
    }

    const changeIssueStatus = useCallback((issueId:number)=>{
        const issue = issues.find((data)=>data.id === issueId);

        if(!issue){
            return;
        }

        const nextStatus = getNextStatus(issue.status)

        setIssues(prev=>
            prev.map((data)=>{
                if(data.id === issueId){
                    return{
                        ...data,
                        status:nextStatus,
                    }
                }
                return data;
            })
        )
    },[])

    const deleteIssue = useCallback((issueId:number)=>{
        setIssues((prev)=>
            prev.filter((issue)=> issue.id!==issueId)
        )
    },[])

    return{
        issues,
        isLoading,
        isError,
        errorMessage,

        createIssue,
        updateIssue,
        changeIssueStatus,
        deleteIssue
    }
}