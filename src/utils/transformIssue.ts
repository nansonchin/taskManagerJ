import type { Issue } from "../type/issue";

function transformIssue(apiIssue:ApiTodo):Issue{
    return{
        id:apiIssue.id,
        title:apiIssue.title,
        description:apiIssue.descripton,
        asisignee:apiIssue?.assignee,
        status:apiIssue.completed? "Done":"To-do",
        dueDate:apiIssue?.dueDate ?? "",
        difficulty: apiIssue?.difficulty?? 3
    }
}