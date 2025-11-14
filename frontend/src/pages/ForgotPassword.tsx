import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword: React.FC = () => {
  const [resetToken, setResetToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/auth/forgot-password", data);
      
      setResetToken(res.data.resetToken);

      toast.success("Reset token generated");
    } catch (err) {
      toast.error("User not found");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 min-w-[350px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>

        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="border w-full p-3 rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="mt-4 w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 duration-300"
        >
          Send Reset Token
        </button>

        {resetToken && (
          <div className="mt-6 text-center">
            <p className="mb-2">Reset token generated successfully.</p>
            <Link
              to={`/reset-password/${resetToken}`}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Continue to Reset Password
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
