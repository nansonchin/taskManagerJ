import { useEffect, useState } from "react"
import fetchIssues from "../api/fetchIssues"

export default function IssuesPage(){
    const [isLoading,setIsLoaading] = useState(false)
    const [issues, setIssues] = useState([])
    const [error,setIsError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    useEffect(()=>{
        try{
            setIsLoaading(true)
            setIsError(false)

            const loadIssues=async()=>{
                const requestApiData = await fetchIssues()
                if(requestApiData){
                    setIssues(requestApiData)
                    setIsLoaading(false)
                }
            }

            loadIssues();
        }catch(e:any){
            setIsError(true)
            setErrorMessage(e.message)
        }
    },[])
}