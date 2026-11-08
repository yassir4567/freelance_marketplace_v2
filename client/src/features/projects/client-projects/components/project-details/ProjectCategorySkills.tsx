import type { Category } from "@/types/category.types";
import type { Skill } from "@/types/skill.types";

interface ProjectCategorySkillsProps {
  category: Category;
  skills: Skill[];
}

function ProjectCategorySkills({
  category,
  skills,
}: ProjectCategorySkillsProps) {
  return (
    <div>
      <div className="flex items-center gap-4 px-6">
        <h3 className="text-lg font-medium mb-1">Category</h3>
        <p>{category.name}</p>
      </div>

      <hr className="bg-gray-900 my-9" />

      <div className="px-6">
        <h3 className="text-lg font-medium mb-2">Skills</h3>
        <div className="flex items-center gap-3">
          {skills.map((skill) => (
            <p
              key={skill.id}
              className="text-sky-800 px-3 py-1 bg-gray-200 rounded-xl text-xs"
            >
              {skill.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCategorySkills;
