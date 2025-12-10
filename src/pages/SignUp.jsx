import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import schema from "../validations/signup";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roles: false,
    },
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSubmitting = (data) => {
    console.log("data:", data);
    console.log("errors:", errors);
    console.log("name & email values:", getValues(["name", "email"]));

    setIsSubmitting(true);
    reset({ name: "", email: "", password: "", roles: false });
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <DevTool control={control} placement="top-left" />
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-[420px] border border-blue-100">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
          ثبت‌نام
        </h2>

        <form
          onSubmit={handleSubmit(formSubmitting)}
          className="flex flex-col gap-4"
        >
          <div>
            <input
              type="text"
              placeholder="نام"
              {...register("name")}
              className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all bg-white placeholder-gray-400"
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>

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

          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="roles"
              {...register("roles")}
              className="accent-blue-600 cursor-pointer w-4 h-4"
            />
            <label htmlFor="roles" className="text-gray-700 text-sm">
              قوانین و مقررات را می‌پذیرم
            </label>
          </div>
          <p className="text-red-500 text-sm">{errors.roles?.message}</p>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg cursor-pointer font-medium transition-all duration-300 ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link
              to="/sign-in"
              className="text-blue-700 font-medium hover:underline"
            >
              ورود
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
