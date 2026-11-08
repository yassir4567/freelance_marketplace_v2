interface ProjectActivitiesProps {
  proposalsCount: number;
}

function ProjectActivities({ proposalsCount }: ProjectActivitiesProps) {
  return (
    <div className="px-6">
      <h3 className="text-lg font-medium mb-1">Project Activites</h3>
      <p>Total Proposals submitted to this project : {proposalsCount}</p>
    </div>
  );
}

export default ProjectActivities;
