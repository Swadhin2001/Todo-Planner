import React from "react";

interface props {
  taskId: number;
  index: number;
  editBtn: (taskId: number) => void;
  deleteBtn: (index: number) => void;
  check : boolean
}

const TaskBody: React.FC<props> = ({
  taskId,
  index,
  editBtn,
  deleteBtn,
  check
}) => {
  return (
    <>
      <div>
        {
            (check)?<></>:
            <button
            className="bg-green-600 px-5 py-2 rounded-lg mx-4"
            onClick={() => editBtn(taskId)}
            >
            Edit
            </button>
        }
        <button
          className="bg-red-600 px-5 py-2 rounded-lg"
          onClick={() => deleteBtn(index)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TaskBody;
