import { GoProjectSymlink } from "react-icons/go";
import { WiDirectionUpRight } from "react-icons/wi";
import { Link } from "react-router-dom";

function ProjectListHeader() {
  return (
    <div className="flex justify-between items-center mb-7">
      <div className="flex items-center gap-2 text-2xl font-medium">
        <GoProjectSymlink />
        <div>Projects</div>
      </div>

      <div>
        <Link
          to="/client/post-project"
          className="bg-transparent border border-blue-500 flex items-center justify-center gap-1 text-sm w-35 p-2 rounded-lg text-blue-500 h-8 hover:text-white hover:bg-blue-500 transition"
        >
          <span>Post Project</span>
          <WiDirectionUpRight size={20} />
        </Link>
      </div>
    </div>
  );
}

export default ProjectListHeader;
