import { useEffect, useState } from "react";
import type { FormErrorsMessage, Issue, IssueFormData } from "../type/issue";
import "./IssueForm.scss"
type IssueFormProps = {
  onSubmit: (formData: IssueFormData, issueId?: number) => void;
  issueToEdit?: Issue;
};

export function IssueForm({ onSubmit, issueToEdit }: IssueFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkErrors = validateForm(formData);
    if (Object.keys(checkErrors).length > 0) {
      setErrorsMessage(checkErrors);
      return;
    }
    onSubmit(formData, issueToEdit?.id);
    if (!issueToEdit) {
      setFormData(initialData);
    }
  };

  const [formData, setFormData] = useState<IssueFormData>({
    title: "",
    description: "",
    assignee: "",
    difficulty: 3,
    dueDate: null,
  });

  const [errorsMessage, setErrorsMessage] = useState<FormErrorsMessage>({
    title: "",
    description: "",
    difficulty: "",
  });

  const initialData: IssueFormData = {
    title: "",
    description: "",
    assignee: "",
    difficulty: 3,
    dueDate: null,
  };

  useEffect(() => {
    if (issueToEdit) {
      setFormData({
        title: issueToEdit.title,
        description: issueToEdit.description,
        assignee: issueToEdit.assignee,
        difficulty: issueToEdit.difficulty,
        dueDate: issueToEdit.dueDate,
      });
    }
  }, [issueToEdit]);

  const validateForm = (formData: IssueFormData) => {
    const errors: FormErrorsMessage = {
      title: "",
      description: "",
      difficulty: "",
    };

    if (formData.title.trim() === "") {
      errors.title = "Title is required";
    }

    if (formData.description.trim() === "") {
      errors.description = "Description is required";
    }

    if (!formData.difficulty) {
      errors.difficulty = "Difficulty is required";
    }

    if (formData.difficulty < 1 || formData.difficulty > 5) {
      errors.difficulty = "Difficulty Number is between 1-5 is acceptable";
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorsMessage && (
        <div>
          {errorsMessage.description}
          {errorsMessage.title}
          {errorsMessage.difficulty}
        </div>
      )}
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
        {errorsMessage.title && (
          <div className="errorMessages">{errorsMessage.title}</div>
        )}
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
        {errorsMessage.description && (
          <div className="errorMessages">{errorsMessage.description}</div>
        )}
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
        {errorsMessage.difficulty && (
          <div className="errorMessages">{errorsMessage.difficulty}</div>
        )}
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
      <button type="submit">{issueToEdit ? "Save" : "Submit"}</button>
    </form>
  );
}
