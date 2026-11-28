import { projectApi } from "@/api/project.api";
import Modal from "@/components/shared/Modal";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface CloseProjectConfirmationProps {
  onCloseModal: () => void;
  projectId: string;
}

export default function CloseProjectConfirmation({
  onCloseModal,
  projectId,
}: CloseProjectConfirmationProps) {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState("");

  const onCloseProject = async () => {
    setIsClosing(true);
    const result = await projectApi.close(projectId);
    setIsClosing(false);

    if (!result.success) {
      setError(
        "Something error occured while closing the project, please try again",
      );
      return;
    }

    onCloseModal();
    navigate("/client/projects")
  };

  return (
    <Modal>
      <div className="w-150 bg-white p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="border border-yellow-600 p-1.5 rounded-md">
            <IoWarningOutline size={20} className="text-yellow-600" />
          </span>
          <span className="text-lg font-mono">Close a project?</span>
        </div>

        <p className="mb-4">Are you sure you want to close this project?</p>

        <div className="bg-gray-200/40 p-4 rounded-xl mb-4">
          <p className="mb-3 font-medium">What happens next?</p>
          <ul>
            <li className="flex gap-2 items-center mb-2">
              <span>
                <IoCloseCircleOutline size={20} className="text-red-500" />
              </span>
              <span>
                All received proposals will automatically be rejected.
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <span>
                <MdLockOutline />
              </span>
              <span>
                The project will no longer be available to freelancers.
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="w-full border border-gray-500 h-10 rounded-xl font-medium disabled:cursor-not-allowed"
            onClick={onCloseModal}
            disabled={isClosing}
          >
            undo
          </button>
          <button
            type="button"
            className="text-white bg-red-500 w-full h-10 rounded-xl font-medium disabled:cursor-not-allowed"
            disabled={isClosing}
            onClick={onCloseProject}
          >
            {isClosing ? "Closing..." : "Close"}
          </button>
        </div>

        {error !== "" && (
          <div className="text-red-600 bg-red-300/40 text-medium px-4 py-2 rounded-lg mt-4">
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
}
