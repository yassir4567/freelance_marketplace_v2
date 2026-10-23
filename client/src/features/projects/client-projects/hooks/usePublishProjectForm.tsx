import { useState } from "react";

const initErrors = {
  title: "",
  description: "",
  experienceLevel: "",
  size: "",
  budget: "",
  duration: "",
  category_id: "",
  skills: "",
};

export type PublishProjectFormType = {
  title: string;
  description: string;
  experienceLevel: string;
  size: string;
  budget: string;
  duration: string;
  category_id: string;
  skills: string[];
};

export const usePublishProjectForm = () => {
  const [form, setForm] = useState<PublishProjectFormType>({
    title: "SaaS application",
    description:
      "To add icons, text, or buttons inside an input, use the InputGroup component. See the Input Group component for more examples To add icons, text, or buttons inside an input, use the InputGroup component. See the Input Group component for more examplesTo add icons, text, or buttons inside an input, use the InputGroup component. See the Input Group component for more examples",
    experienceLevel: "",
    size: "",
    budget: "",
    duration: "",
    category_id: "",
    skills: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [generalError, setGeneralError] = useState("");

  const validateProjectDetails = (title: string, description: string) => {
    const newErrors: Record<string, string> = {};

    if (title.trim() === "") {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.trim().length > 200) {
      newErrors.title = "Title must be at most 200 characters";
    }

    if (description.trim() === "") {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 300) {
      newErrors.description = "Description must be at least 300 characters";
    } else if (description.trim().length > 3000) {
      newErrors.description = "Description must be at most 3000 characters";
    }

    setErrors((prev) => ({
      ...prev,
      title: newErrors.title ?? "",
      description: newErrors.description ?? "",
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateProjectScope = (
    experienceLevel: string,
    size: string,
    category_id: string,
    skills: string[],
  ) => {
    const newErrors: Record<string, string> = {};

    if (experienceLevel.trim() === "") {
      newErrors.experienceLevel = "Experience level is required";
    }

    if (size.trim() === "") {
      newErrors.size = "Size is required";
    }

    if (category_id.trim() == "") {
      newErrors.category_id = "Category is required";
    }

    if (skills.length == 0) {
      newErrors.skills = "Skills are required (choose at least one)";
    }

    setErrors((prev) => ({
      ...prev,
      experienceLevel: newErrors.experienceLevel ?? "",
      size: newErrors.size ?? "",
      category_id: newErrors.category_id ?? "",
      skills: newErrors.skills ?? "",
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateProjectBudgetAndDuration = (
    budget: string,
    duration: string,
  ) => {
    const newErrors: Record<string, string> = {};

    if (budget.trim() === "") {
      newErrors.budget = "Budget is required";
    } else if (Number.isFinite(budget) && +budget <= 20) {
      newErrors.budget = "Budget must be at least 20$";
    }

    if (duration.trim() === "") {
      newErrors.duration = "Duration is required";
    }

    setErrors((prev) => ({
      ...prev,
      budget: newErrors.budget ?? "",
      duration: newErrors.duration ?? "",
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (form: PublishProjectFormType) => {
    const newErrors = initErrors;

    if (form.title.trim() === "") {
      newErrors.title = "Title is required";
    } else if (form.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (form.title.trim().length > 200) {
      newErrors.title = "Title must be at most 200 characters";
    }

    if (form.description.trim() === "") {
      newErrors.description = "Description is required";
    } else if (form.description.trim().length < 300) {
      newErrors.description = "Description must be at least 300 characters";
    } else if (form.description.trim().length > 3000) {
      newErrors.description = "Description must be at most 3000 characters";
    }

    if (form.experienceLevel.trim() === "") {
      newErrors.experienceLevel = "Experience level is required";
    }

    if (form.size.trim() === "") {
      newErrors.size = "Size is required";
    }

    if (form.budget.trim() === "") {
      newErrors.budget = "Budget is required";
    } else if (+form.budget <= 20) {
      newErrors.budget = "Budget must be at least 20$";
    }

    if (form.duration.trim() === "") {
      newErrors.duration = "Duration is required";
    }

    if (form.category_id.trim() == "") {
      newErrors.category_id = "Category is required";
    }

    if (form.skills.length == 0) {
      newErrors.skills = "Skills are required (choose at least one)";
    }

    return newErrors;
  };

  const handleAddSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };      

  const handleRemoveSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((sk) => sk !== skill),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(initErrors);
    setGeneralError("");
  };

  return {
    form,
    errors,
    handleInputChange,
    validateProjectDetails,
    validateProjectScope,
    validateProjectBudgetAndDuration,
    handleSubmit,
    handleAddSkill,
    handleRemoveSkill,
  };
};
