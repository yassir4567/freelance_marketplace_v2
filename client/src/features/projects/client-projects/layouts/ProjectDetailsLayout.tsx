import { NavLink, Outlet, useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import ProjectDetailsSkeleton from "../components/project-details/ProjectDetailsSkeleton";

function ProjectDetailsLayout() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `border flex items-center justify-center px-4 rounded-lg text-sm ${
      isActive
        ? "bg-sky-700 text-white border-gray-300"
        : "hover:border-sky-700"
    }`;

  return (
    <>
      {isLoading ? (
        <ProjectDetailsSkeleton />
      ) : error || !project ? (
        <div>{error ?? "Project data not found"}</div>
      ) : (
        <div className="mt-5">
          <h1 className="font-medium text-xl">{project.title}</h1>
          <nav className="grid grid-cols-2 gap-3 h-12 mt-5">
            <NavLink to={`/client/projects/${id}`} end className={navLinkClass}>
              View project post
            </NavLink>
            <NavLink
              to={`/client/projects/${id}/proposals`}
              end
              className={navLinkClass}
            >
              Review Proposals
            </NavLink>
          </nav>

          <main className="mt-10">
            <Outlet context={{ project }} />
          </main>
        </div>
      )}
    </>
  );
}

export default ProjectDetailsLayout;
