import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const schema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type FormData = z.infer<typeof schema>;

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post(`/auth/reset-password/${token}`, data);
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Reset link expired or invalid");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 min-w-[350px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>

        <input
          {...register("password")}
          type="password"
          placeholder="Enter new password"
          className="border w-full p-3 rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
