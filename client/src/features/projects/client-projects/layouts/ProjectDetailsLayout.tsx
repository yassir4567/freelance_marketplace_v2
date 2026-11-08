import { NavLink, Outlet, useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";

function ProjectDetailsLayout() {
  const { id } = useParams();

  const { project, isLoading, error } = useProject(id);

  // todo : I will improve it later
  if (isLoading) return <div>Data is loading...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>No data found</div>;

  return (
    <div className="mt-5">
      <h1 className="font-medium text-xl">{project.title}</h1>
      <nav className="grid grid-cols-2 gap-3 h-12 mt-5">
        <NavLink
          to={`/client/projects/${id}`}
          className={({ isActive }) => {
            let className =
              "border flex items-center justify-center px-4 rounded-lg text-sm";
            if (isActive)
              className += " bg-sky-700 text-white border-gray-300 ";
            if (!isActive) className += " hover:border-sky-700";
            return className;
          }}
        >
          View project post
        </NavLink>
        <NavLink
          to={`/client/projects/${id}/proposals`}
          className={({ isActive }) => {
            let className =
              "border flex items-center justify-center px-4 rounded-lg text-sm";
            if (isActive)
              className += " bg-sky-700 text-white border-gray-300 ";
            if (!isActive) className += " hover:border-sky-700";
            return className;
          }}
        >
          Review Proposals
        </NavLink>
      </nav>

      <main className="mt-10">
        <Outlet context={{ project }} />
      </main>
    </div>
  );
}

export default ProjectDetailsLayout;
