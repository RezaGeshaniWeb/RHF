import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,30}$/;

const schema = yup.object({
  email: yup
    .string()
    .required("وارد کردن ایمیل اجباری می‌باشد")
    .matches(emailRegex, "ایمیل وارد شده معتبر نمی‌باشد")
    .min(10, "ایمیل حداقل باید ۱۰ کاراکتر داشته باشد")
    .max(50, "ایمیل نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

  password: yup
    .string()
    .required("وارد کردن رمز عبور اجباری می‌باشد")
    .matches(
      passwordRegex,
      "رمز عبور باید شامل حروف بزرگ، کوچک، عدد و یک علامت خاص باشد"
    )
    .min(8, "رمز عبور حداقل باید ۸ کاراکتر باشد")
    .max(30, "رمز عبور نمی‌تواند بیشتر از ۳۰ کاراکتر باشد"),
});

export default schema;
