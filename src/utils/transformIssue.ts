import type { ApiTodo, Issue } from "../type/issue";

function transformIssue(apiIssue:ApiTodo):Issue{
    return{
        id:apiIssue.id,
        title:apiIssue.todo,
        description:"",
        asisignee:String(apiIssue.userId),
        status:apiIssue.completed? "Done":"To-do",
        dueDate:null,
        difficulty: 3
    }
}