import type { ClientProjectDetails } from "../../types/project.types";

interface ProjectBudgetProps {
  budgets: Pick<ClientProjectDetails, "budget" | "finalPrice">;
}

function ProjectBudget({ budgets }: ProjectBudgetProps) {
  return (
    <div className="flex flex-col gap-2 px-6">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Estimated budget</span>
        <span>{budgets.budget}$</span>
      </div>

      {budgets.finalPrice && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Agreed contract price</span>
          <span>{budgets.finalPrice}$</span>
        </div>
      )}
    </div>
  );
}

export default ProjectBudget;
