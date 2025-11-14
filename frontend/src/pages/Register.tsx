import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/auth.store";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("account created");
      navigate("/todos");
    } catch (err) {
      alert("Error while registering");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Create Account
          </h1>
          <p className="text-slate-500">Get started with your free account</p>
        </div>


        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="enter your name"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                  errors.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-green-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="enter your email"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-green-500"
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
                    : "border-slate-200 focus:border-green-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition-all duration-200 shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:text-green-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
