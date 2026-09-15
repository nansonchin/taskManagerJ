import { useEffect, useState } from "react"
import fetchIssues from "../api/fetchIssues"

export default function IssuesPage(){
    const [isLoading,setIsLoaading] = useState(false)
    const [issues, setIssues] = useState([])
    const [error,setIsError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    useEffect(async()=>{
        try{
            const requestApiData = await fetchIssues()
            setIssues(requestApiData)
        }catch(e){
            setIsError(true)
            setErrorMessage(e.message)
        }
    },[])
}