import { HiOutlinePlusSmall } from "react-icons/hi2";
import { Link } from "react-router-dom";

function PostProjectBtn() {
  return (
    <div>
      <Link
        to="/client/post-project"
        className="bg-transparent border border-blue-500 flex items-center justify-center gap-1 text-xs font-medium w-30 p-2 rounded-lg text-blue-500 h-8 hover:text-white hover:bg-blue-500 transition"
      >
        <span>Post Project</span>
        <HiOutlinePlusSmall />
      </Link>
    </div>
  );
}

export default PostProjectBtn;
