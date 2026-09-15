import { useEffect, useState } from "react"
import fetchIssues from "../api/fetchIssues"

export default function IssuesPage(){
    const [isLoading,setIsLoading] = useState(false)
    const [issues, setIssues] = useState([])
    const [error,setIsError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    useEffect(()=>{
        setIsLoading(true)
        setIsError(false)
        const loadIssues =async () =>{
            try{
                const result = await fetchIssues()
                if(result){
                    setIssues(result)
                    setIsLoaading(false)
                }
            }catch(error:any){
                setIsError(true)
                setIsLoaading(false)
                setErrorMessage(error.message)
            }
        }

        loadIssues()
    },[])
}