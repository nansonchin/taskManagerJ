function getNextStatus(status:string){
    if(status === "to-do"){
        return "In progress"
    }else if(status ==="In progress"){
        return "done"
    }else{
        return "to-do"
    }
}

export default getNextStatus