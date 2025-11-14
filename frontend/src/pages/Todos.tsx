import React, { useEffect } from "react";
import TodoInput from "../components/TodoInput";
import TodoItems from "../components/TodoItems";
import { useTodoStore } from "../store/todo.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useAuthStore } from "../store/auth.store";


const Todos: React.FC = () => {
  const todos = useTodoStore((s) => s.todos);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);

  useEffect(() => {
    fetchTodos().catch((err) => console.error(err));
  }, [fetchTodos]);

  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="mb-6 sm:text-6xl text-3xl mt-20  text-black/60 font-secondary">Add Todos</h1>
      <div>
        <TodoInput />
      </div>

      <div className="fixed right-0 flex justify-end p-2">
         <button
            onClick={logout}
            className="sm:px-4 sm:py-2  cursor-pointer px-1 py-1 rounded-lg bg-orange-500 text-white hover:bg-black transition shadow"
         >
         Logout
        </button>
            </div>


      {todos && todos.length > 0 ? (
        <div className="overflow-y-auto mb-4">
          {todos.map((item) => (
            <TodoItems key={item._id} todo={item} />
          ))}
        </div>

      ) : (
        <div className="sm:flex gap-10 sm:mt-20 mt-10 overflow-hidden font-secondary ">
          <div className="sm:w-190 ml-3">
            <h1 className="sm:text-4xl text-4xl sm:mb-0 mb-6 text-black/50">This is Your place to Manage Tasks </h1>
            <h1 className="sm:text-3xl sm:ml-2 sm:mt-8 sm:mb-2 mb-6 text-2xl bg-purple-500 sm:w-fit font-display w-80 rounded-xl py-2 px-2 text-white">Create your first Todo! </h1>
            <h1 className="sm:text-2xl sm:ml-2 text-black/80 ">Simple powerful Todo App built to help you organize your daily work and personal goals efficiently. </h1>
          </div>
          <img
            className="sm:w-120 sm:h-90 rounded-2xl "
            src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-completed-tasks-illustration-svg-download-png-4202464.png"
            alt="illustration"
          />
        </div>
      )}

      <div className="mt-auto bg-black font-secondary text-white w-full">
        <ul className="flex justify-around sm:gap-100 gap-10 p-3 sm:text-l">
          <a href="https://www.linkedin.com/in/piyush-koundal-649471203/" target="_blank" rel="noreferrer"><li className="cursor-pointer"><FontAwesomeIcon icon={faLinkedin} /> Linkedin</li></a>
          <a href="https://github.com/Disguised-toast0" target="_blank" rel="noreferrer"><li className="cursor-pointer"><FontAwesomeIcon icon={faGithub} /> Github</li></a>
          <a href="https://x.com/the_piyush_k" target="_blank" rel="noreferrer"><li className="cursor-pointer"><FontAwesomeIcon icon={faSquareXTwitter} /> X / Twitter</li></a>
        </ul>
      </div>
    </div>
    
  );
};

export default Todos;
