import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";

export const Register: React.FC<{ setIsLoggedIn: (x: boolean) => void }> = ({ setIsLoggedIn }) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required().min(4),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-zA-Z]/, "Password must contain at least 1 letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(/[@#$%^&*!]/, "Password must contain at least 1 special character")
      .required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: { email: string; password: string; username: string }) => {
    try {
      await axios.post("http://localhost:3000/users/signup", data);
      toast.success("User created successfully");

      setIsLoggedIn(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex h-full items-center flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img className="mx-auto h-20 w-auto" src="/easygenerator-logo.jpg" alt="Your Company" /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-8">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              {...register("username")}
              id="username"
              className="outline-none w-full rounded-md px-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="text-red-500 text-sm absolute">{errors?.username?.message}</span>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="outline-none w-full rounded-md px-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="text-red-500 text-sm absolute">{errors?.email?.message}</span>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              {...register("password")}
              id="password"
              type="password"
              className="outline-none w-full rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="text-red-500 text-sm absolute">{errors?.password?.message}</span>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
            Sign up
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
