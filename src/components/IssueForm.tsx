import { useState } from "react";
import type { Issue, IssueFormData } from "../type/issue";

type IssueFormProps = {
  onCreate: (formData: IssueFormData) => void;
  issueToEdit?:Issue

  
};

export function IssueForm({ onCreate }: IssueFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData(initialData)
  };

  const [formData, setFormData] = useState<IssueFormData>({
    title: "",
    description: "",
    assignee: "",
    difficulty: 3,
    dueDate: null,
  });

  const initialData :IssueFormData={
     title: "",
    description: "",
    assignee: "",
    difficulty: 3,
    dueDate: null,
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>Title:</div>

        <input
          value={formData.title}
          onChange={(e) => {
            setFormData({
              ...formData,
              title: e.target.value,
            });
          }}
        />
      </div>

      <div>
        <div>Description:</div>
        <textarea
          value={formData.description}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: e.target.value,
            });
          }}
        />
      </div>

      <div>
        <div>Assignee:</div>
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
      </div>

      <div>
        <div>Difficulty:</div>
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
      </div>

      <div>
        <div>Date:</div>
        <input
          value={String(formData.dueDate)}
          onChange={(e) => {
            setFormData({
              ...formData,
              dueDate: new Date(e.target.value ?? ""),
            });
          }}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
