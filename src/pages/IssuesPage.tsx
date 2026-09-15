import { useEffect, useState } from "react";
import fetchIssues from "../api/fetchIssues";

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
        setIssues(result);
        setIsLoading(false);
      } catch (error: any) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    };

    loadIssues();
  }, []);

  if(isLoading){
    return(
        <div>
            Loading ...
        </div>
    )
  }

  if(isError){
    return(
        <div>
            Something went wrong
        </div>
    )
  }

  return(
    <div>
        {
            issues.forEach((issue)=>{
                return (
                    <div>
                        {issue}
                        </div>
                )
            })
        }
    </div>
  )
}
