/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { Link } from 'react-router';

const Register = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();


    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const onSubmit = async (data) => {
      try {
        await registerUser(data).unwrap();
        alert("Registration Successful")
      } catch (err) {
        alert(err?.data?.message || "Registration failed");
      }
    };

  return (
   <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">First name</label>
              <input
                {...register("firstName", { required: "First name is required" })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">Last name</label>
              <input
                {...register("surname", { required: "Surname is required" })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.surname && <p className="text-red-500 text-xs">{errors.surname.message}</p>}
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="text-sm">
                  <Link to={'#'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <input
                type="password"
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { 
                    value: 6, 
                    message: "Password must be at least 6 characters" 
                    } 
                })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>


            <div className='pt-4'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Sign up"}
              </button>
              {error && <p className="text-red-500 text-xs">{error.data?.message}</p>}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to={"/login"} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register