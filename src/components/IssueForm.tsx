import { useState } from "react";
import type { IssueFormData } from "../type/issue";

type IssueFormProps = {
    onCreate:(formData:IssueFormData) => void;
}

export function IssueForm({onCreate}:IssueFormProps) {

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        onCreate(formData)
    }

  const [formData, setFormData] = useState<IssueFormData>({
    title: "",
    description: "",
    assignee: "",
    difficulty: 3,
    dueDate: null,
  });
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.title}
        onChange={(e) => {
          setFormData({
            ...formData,
            title: e.target.value,
          });
        }}
      />
      <textarea
        value={formData.description}
        onChange={(e) => {
          setFormData({
            ...formData,
            description: e.target.value,
          });
        }}
      />
      <input
        type="number"
        value={formData.assignee}
        onChange={(e) => {
          setFormData({
            ...formData,
            assignee: e.target.value,
          });
        }}
      />
      <input
      type="number"
        value={formData.difficulty}
        onChange={(e) => {
          setFormData({
            ...formData,
            difficulty: Number(e.target.value),
          });
        }}
      />
       <input
        value={String(formData.dueDate)}
        onChange={(e) => {
          setFormData({
            ...formData,
            dueDate: new Date(e.target.value ?? ""),
          });
        }}
      />
      <button type="submit">
        Submit
      </button>
    </form>
  );
}
