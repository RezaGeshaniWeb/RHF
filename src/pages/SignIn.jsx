import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import schema from "../validations/signin";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSubmitting = (data) => {
    console.log("data : ", data);

    setIsSubmitting(true);
    reset({ email: "", password: "" });
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <DevTool control={control} placement="top-left" />
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 p-8 w-[420px]">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
          ورود به حساب کاربری
        </h2>

        <form
          onSubmit={handleSubmit(formSubmitting)}
          className="flex flex-col gap-4"
        >
          <div>
            <input
              type="email"
              placeholder="ایمیل"
              {...register("email")}
              className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all bg-white placeholder-gray-400"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              placeholder="رمز عبور"
              {...register("password")}
              className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all bg-white placeholder-gray-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg cursor-pointer font-medium transition-all duration-300 ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            حساب کاربری ندارید؟{" "}
            <Link
              to="/sign-up"
              className="text-blue-700 font-medium hover:underline"
            >
              ثبت‌نام
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
