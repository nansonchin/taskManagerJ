import type { Status } from "../type/issue"

function getNextStatus(status:Status){
    if(status === "To-do"){
        return "In-progress"
    }else if(status ==="In-progress"){
        return "Done"
    }else{
        return "To-do"
    }
}

export default getNextStatus