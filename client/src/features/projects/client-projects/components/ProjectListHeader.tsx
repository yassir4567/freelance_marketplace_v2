import PostProjectBtn from "@/components/shared/PostProjectBtn";
import { GoProjectSymlink } from "react-icons/go";

function ProjectListHeader() {
  return (
    <div className="flex justify-between items-center mb-7">
      <div className="flex items-center gap-2 text-2xl font-medium">
        <GoProjectSymlink />
        <div>Projects</div>
      </div>

      <PostProjectBtn />
    </div>
  );
}

export default ProjectListHeader;
