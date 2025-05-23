import { UserCircleIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useGetUserQuery, useUpdateUserMutation, useUpdatePasswordMutation } from "../../redux/features/auth/authApi"
import PasswordInput from "../../components/passwordInput"

const Profile = () => {
  const { data: user, isLoading, error } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors },
    setValue
  } = useForm();

  // Password form
  const {
  register: registerPassword,
  handleSubmit: handlePasswordSubmit,
  formState: { errors: errorsPassword },
  reset: resetPasswordForm,
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("surname", user.surname);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching user data:", error);
    return <div>Error fetching user data</div>;
  }

  // console.log("uuuuu", user);

  const onProfileSubmit =async (data) => {
    try {
      await updateUser(data).unwrap();
      // dispatch(setCredentials(data));
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert(err?.data?.message || "Update failed");
    }
  }

  const onPasswordSubmit = async (data) => {
    try {
      await updatePassword(data).unwrap();
      resetPasswordForm();
      alert("Password changed successfully");
    } catch (err) {
      console.error("Failed to change password", err);
      alert(err?.data?.message || "Change password failed");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center h-full gap-6">
        <UserCircleIcon className="size-10 text-primary" />
        <h1 className="text-2xl font-primary font-bold">My Account</h1>
      </div>
      {/* Profile section */}
      <form className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleProfileSubmit(onProfileSubmit)}>
        <div className="flex flex-col">
          <label className="block text-lg font-secondary font-regular text-gray-900">First name</label>
          <input
            {...registerProfile("firstName", { required: "First name is required" })}
            className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="block text-lg font-secondary  font-regular text-gray-900">Surname</label>
          <input
            {...registerProfile("surname", { required: "Surname is required" })}
            className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
          />
          {errors.surname && <p className="text-red-500 text-xs">{errors.surname.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="block text-lg font-secondary font-regular text-gray-900">Email</label>
          <input
            {...registerProfile("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            readOnly
            className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
          />
        </div>
        
        <button type="submit" className="px-8 py-2 rounded-md self-end bg-primary">
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </form>

      {/* Change password section */}
      <hr className="border-t-1 border-gray-300 my-12" />
      <div>
        <h2 className="text-xl font-secondary font-bold">Change Password</h2>
        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            register={registerPassword}
            error={errorsPassword.currentPassword}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            register={registerPassword}
            error={errorsPassword.newPassword}
          />

          <div></div>
          <button type="submit" className="px-8 py-2 rounded-md self-end bg-primary">
            {isUpdatingPassword ? "Changing..." : "Change Password"}
          </button>
        </form>
        {/* <p className="text-red-500 text-xs mt-2">{errorsPassword.currentPassword?.message}</p>
        <p className="text-red-500 text-xs mt-2">{errorsPassword.newPassword?.message}</p>
        <p className="text-green-500 text-xs mt-2">{errorsPassword.password?.message}</p>
        <p className="text-green-500 text-xs mt-2">{errorsPassword.confirmPassword?.message}</p> */}
      </div>
    </div>
  )
}

export default Profile