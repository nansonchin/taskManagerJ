function getNextStatus(status:string){
    if(status === "To-do"){
        return "In-progress"
    }else if(status ==="In-progress"){
        return "Done"
    }else{
        return "To-do"
    }
}

export default getNextStatus