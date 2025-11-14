import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/auth.store";
import { useNavigate, Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success("Logged in!");
      navigate("/todos");
    } catch (err) {
      toast.error("create a account first!")
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500">Sign in to continue to your account</p>
        </div>

 
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>


            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                  errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

          <p className="mt-2 text-right">
            <Link to="/forgot-password" className="text-blue-600 underline text-sm">
            Forgot Password?
            </Link>
          </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-500 cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>


        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
