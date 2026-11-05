import PostProjectBtn from "@/components/shared/PostProjectBtn";
import { GoProjectSymlink } from "react-icons/go";

function ProjectListHeader() {
  return (
    <div className="flex justify-between items-center mb-7">
      <div className="flex items-center gap-2 text-2xl font-medium">
        <GoProjectSymlink size={18} />
        <div className="text-[18px]">Here is your published projects</div>
      </div>

      <PostProjectBtn />
    </div>
  );
}

export default ProjectListHeader;
