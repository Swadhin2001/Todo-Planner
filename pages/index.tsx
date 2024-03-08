import TaskBody from "@/components/task";
import usePostTask from "@/hooks/usePostTask";
import useTaskInfo from "@/hooks/useTaskInfo";
import useUpdateTask from "@/hooks/useUpdateTask";
import { Task } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState<Task[]>([]);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Get Request
    async function Get() {
      try {
        setLoading(true);
        const data = await axios.get("http://localhost:3000/api/");
        const fetchTasks = data.data;
        const tasks: Task[] = [];
        fetchTasks.forEach((element: any) => {
          tasks.push({
            id: element.id,
            taskName: element.taskName,
            check: false,
            editCheck: false,
            isCompleted: element.check,
          });
        });
        setText(tasks);
      } catch (error) {
        console.log("Get Request error:", error);
      } finally {
        setLoading(false);
      }
    }
    Get();
  }, []);

  const putData = async () => {
    try {
      if (task == "") {
        alert("Please Enter a Task");
      } else {
        const postData = {
          taskName: task,
          isCompleted: false,
        };
        // axios.post("http://localhost:3000/api/", postData);
        usePostTask(postData);
        const newTask: Task = {
          id: String(Date.now()),
          taskName: task,
          check: false,
          editCheck: false,
          isCompleted: false,
        };
        const updateTask = [...text, newTask];
        setText(updateTask);
        setTask("");
        console.log("Post Successfull");
      }
    } catch (error) {
      console.log("Post data error: ", error);
    }
  };

  const clearAllData = () => {
    try {
      axios.delete("http://localhost:3000/api");
      setText([]);
      console.log("All Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const editBtn = (index: string): void => {
    const editData = [...text];
    editData.forEach((element) => {
      if (element.id === index) {
        setEditTask(element.taskName);
        element.editCheck = true;
      }
    });
    setText(editData);
  };

  const okBtn = (index: string): void => {
    try {
      const editData = [...text];
      editData.forEach((element) => {
        if (element.id === index) {
          if (editTask === "") {
            alert("Please Enter a Task");
          } else {
            useUpdateTask(element.id, editTask,false);

            console.log("Task Updated");
            element.taskName = editTask;
            element.editCheck = false;
            element.isCompleted = false;
          }
        }
      });
      setText(editData);
    } catch (error) {
      console.log("Update Error: ", error);
    }
  };

  const deleteBtn = (index: number, taskId: string): void => {
    try {
      const deleteData = [...text];
      deleteData.forEach((element) => {
        if (element.id === taskId) {
          const id = taskId;
          axios.delete(`http://localhost:3000/api/routes/${id}`);
          console.log("Deleted Successfully");
        }
      });
      deleteData.splice(index, 1);
      setText(deleteData);
    } catch (error) {
      console.log("Delete Method error: ", error);
    }
  };

  const completed = (index: string) => {
    const task = [...text];
    task.forEach((element) => {
      if (element.id === index && element.isCompleted === false) {
        const id = element.id;
        const updatedCheck = {
          updatedTask: element.taskName,
          isCompleted: true,
        };
        axios.put(`http://localhost:3000/api/routes/${id}`, updatedCheck);
        element.isCompleted = true;
      } else if (element.id === index && element.isCompleted === true) {
        const id = element.id;
        const updatedCheck = {
          updatedTask: element.taskName,
          isCompleted: false,
        };
        axios.put(`http://localhost:3000/api/routes/${id}`, updatedCheck);
        element.isCompleted = false;
      }
      setText(task);
    });
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="w-[100%]">
            <input
              type="text"
              placeholder="Enter Your Task"
              onChange={(e) => {
                setTask(e.target.value);
              }}
              value={task}
              className="bg-black text-white border border-white px-5 py-2 rounded-lg"
            />
            <button onClick={putData} className="m-4 bg-green-600 px-5 py-2 rounded-lg">
              Put
            </button>
            <button onClick={clearAllData} className="bg-red-600 px-5 py-2 rounded-lg">
              ClearAll
            </button>
          </div>
          {text.map((tasks: Task, index): React.JSX.Element => {
            return (
              <div key={index} className="my-2 w-[40%] ">
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
                      <div
                        className={tasks.isCompleted ? "font-bold text-green-500 cursor-pointer" : " cursor-pointer"}
                        onClick={() => {
                          completed(tasks.id);
                        }}
                      >
                        {" "}
                        &nbsp; {tasks.taskName}
                      </div>
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
        </div>
      )}
    </>
  );
}
