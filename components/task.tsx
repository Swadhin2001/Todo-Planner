import React from "react";

interface props {
  taskId: string;
  index: number;
  editBtn: (taskId: string) => void;
  deleteBtn: (index: number, taskId:string) => void;
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
      <div className="flex">
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
          onClick={() => deleteBtn(index, taskId)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TaskBody;
