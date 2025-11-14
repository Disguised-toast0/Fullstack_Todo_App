import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faFloppyDisk, faSquare } from "@fortawesome/free-regular-svg-icons";
import { Todo } from "../types/todo";
import { useTodoStore } from "../store/todo.store";

type Props = {
  todo: Todo;
};

const TodoItems: React.FC<Props> = ({ todo }) => {
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);

  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);

  const editHandler = async () => {
    // if currently not in edit mode -> open edit mode
    if (!editClicked) {
      setEditClicked(true);
      return;
    }

    // if already in edit mode, save
    if (editClicked) {
      if (title.trim()) {
        try {
          await updateTodo(todo._id, title.trim());
        } catch (err) {
          console.error("Update failed", err);
        } finally {
          setEditClicked(false);
        }
      } else {
        alert("empty value");
      }
    }
  };

  return (
    <div
      className={`mt-5 flex sm:flex-row sm:justify-between bg-black/15 rounded-4xl font-secondary w-90 sm:w-200 sm:py-2 py-2 px-6 ${
        editClicked ? "bg-black/40 border-blue-400" : "ring-0"
      } ${todo.completed ? "bg-green-500/30 border-none" : "none"}`}
    >
      <div className="flex ">
        <button
          onClick={() => (!editClicked ? toggleTodo(todo._id) : alert("Please Save Changes"))}
          title="Mark as Completed"
          className={`sm:px-4 px-2 py-1 sm:mr-8 mr-2 rounded-4xl sm:py-3 border-none cursor-pointer ${
            todo.completed ? "bg-green-500" : "bg-slate-700"
          } duration-300 hover:bg-green-600 `}
        >
          {todo.completed ? (
            <FontAwesomeIcon icon={faCircleCheck} className="text-white" />
          ) : (
            <FontAwesomeIcon icon={faSquare} className="text-white" />
          )}
        </button>

        <input
          type="text"
          className="sm:w-110 w-45 mr-2 tracking-wide capitalize outline-none sm:text-l"
          value={title}
          title="Change the Todo Name"
          readOnly={!editClicked}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex">
        <button
          disabled={todo.completed}
          onClick={editHandler}
          title={editClicked ? "Save" : "Edit"}
          className={`sm:px-4 px-2 py-1 mr-2 rounded-4xl sm:py-3 border-none ${
            todo.completed ? "bg-black/20" : "bg-slate-700"
          }  cursor-pointer duration-300 ${editClicked ? " hover:bg-white/40" : " hover:bg-blue-500"}`}
        >
          {editClicked ? <FontAwesomeIcon icon={faFloppyDisk} className="text-white" /> : <FontAwesomeIcon icon={faPenToSquare} className="text-white" />}
        </button>

        <button
          title="Delete"
          onClick={() => deleteTodo(todo._id)}
          className={`sm:px-4 px-2 py-1 mr-2 rounded-4xl sm:py-3 border-none cursor-pointer duration-300 hover:bg-red-500 ${
            todo.completed ? "bg-red-500" : "bg-slate-700"
          }`}
        >
          <FontAwesomeIcon icon={faTrash} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TodoItems;
