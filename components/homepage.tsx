import TaskBody from "@/components/task";
import { Task } from "@/types";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  useEffect(() => {
      // Have to write a function to fetch data from api and perfrom CRUD operation
  }, [])
  


  const [text, setText] = useState<Task[]>([]);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");

  const putData = () => {
    if (task == "") {
      alert("Please Enter a Task");
    } else {
      const newTask: Task = {
        id: Date.now(),
        taskName: task,
        check: false,
        editCheck: false,
      };
      const updateTask = [...text, newTask];
      setText(updateTask);
      setTask("");
    }
  };
  const clearAllData = () => {
    setText([]);
  };

  const editBtn = (index: number): void => {
    const editData = [...text];
    editData.forEach((element) => {
      if (element.id === index) {
        setEditTask(element.taskName);
        element.editCheck = true;
      }
    });
    setText(editData);
  };

  const okBtn = (index: number): void => {
    const editData = [...text];
    editData.forEach((element) => {
      if (element.id === index) {
        if (editTask === "") {
          alert("Please Enter a Task");
        } else {
          element.taskName = editTask;
          element.editCheck = false;
        }
      }
    });
    setText(editData);
  };

  const deleteBtn = (index: number): void => {
    const deleteData = [...text];
    deleteData.splice(index, 1);
    setText(deleteData);
  };

  return (
    <>
      <div className="w-[30%]">
        <input
          type="text"
          placeholder="Enter Your Task"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
          className="bg-black text-white border border-white px-5 py-2 rounded-lg"
        />
        <button
          onClick={putData}
          className="m-4 bg-green-600 px-5 py-2 rounded-lg"
        >
          Put
        </button>
        <button
          onClick={clearAllData}
          className="bg-red-600 px-5 py-2 rounded-lg"
        >
          ClearAll
        </button>
      </div>

      {text.map((tasks: Task, index): React.JSX.Element => {
        return (
          <div key={tasks.id} className="my-2 w-[30%]">
            <div className="m-3 flex justify-between items-center border border-red-400 p-2 rounded-lg">
              <div className="w-[50%] flex items-center">
                <div className="font-bold">{index + 1}.</div>
                {tasks.editCheck ? (
                  <input
                    type="text"
                    onChange={(e) => setEditTask(e.target.value)}
                    value={editTask}
                    className="bg-black text-white border border-white px-5 h-10 rounded-lg"
                  />
                ) : (
                  <div> &nbsp; {tasks.taskName}</div>
                )}
                {tasks.editCheck ? (
                  <button
                    className="m-4 bg-green-600 px-5 py-2 rounded-lg"
                    onClick={() => {
                      okBtn(tasks.id);
                    }}
                  >
                    OK
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <TaskBody
                check={tasks.editCheck}
                taskId={tasks.id}
                index={index}
                editBtn={editBtn}
                deleteBtn={deleteBtn}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
