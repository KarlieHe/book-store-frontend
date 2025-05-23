import { TruckIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react"

const AUStates = [ "NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT" ];

const ShippingForm = () => {
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext()

    // 预填表单
  useEffect(() => {
    setValue("firstName", user.firstName);
    setValue("surname", user.surname);
    setValue("email", user.email);
    setValue("mobile", "0444444444");
    setValue("street", "123 Main St");
    setValue("suburb", "Sydney");
    setValue("state", "NSW");
    setValue("postCode", "2000");
  }, [user, setValue]);

  return (
    <div className="bg-white py-6 px-16 rounded-3xl shadow-lg">
          <h3 className="text-3xl font-secondary font-regular">Shipping information</h3>
          <div className="flex space-x-4 mb-6 mt-6 ">
              <label className="cursor-pointer w-1/2">
                <input 
                  type="radio" 
                  {...register("shippingMethod", { required: true })} 
                  value="Delivery" 
                  className="hidden peer" 
                  checked />
                <div className="flex align-baseline px-8 py-2 rounded-md border border-gray-300 peer-checked:bg-blue-500 peer-checked:text-white">
                  <TruckIcon className="h-6 w-6 inline-block mr-2" />
                  <span>Delivery</span>
                </div>
              </label>
              <label className="cursor-pointer w-1/2">
                <input 
                  type="radio" 
                  {...register("shippingMethod", { required: true })}
                  value="Pickup" 
                  className="hidden peer" />
                <div className="flex align-baseline px-8 py-2 rounded-md border border-gray-300 peer-checked:bg-blue-500 peer-checked:text-white">
                  <BuildingStorefrontIcon className="h-6 w-6 inline-block mr-2" />
                  <span>Pickup</span>
                </div>
              </label>
          </div>
          <div>
            <div>
              <label className="block text-md font-regular text-gray-900">First name</label>
              <input
                {...register("firstName", { required: "First name is required" })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div className="mt-4">
              <label className="block text-md font-regular text-gray-900">Surname</label>
              <input
                {...register("surname", { required: "Surname is required" })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.surname && <p className="text-red-500 text-xs">{errors.surname.message}</p>}
            </div>
            <div className="mt-4">
              <label className="block text-md font-regular text-gray-900">Email address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="mt-4">
              <label className="block text-md font-regular text-gray-900">Mobile</label>
              <input
                {...register("mobile", { 
                  required: "Mobile number is required",
                  pattern: {
                    value: /^(\+61|0)[2-478]\d{8}$/,
                    message: "Invalid mobile number",
                  },
                })}
                type="tel"
                className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message}</p>}
            </div>
            <div className="mt-4">
              <label className="block text-md font-regular text-gray-900">Street</label>
              <input
                {...register("street", { required: "Street is required" })}
                className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              {errors.street && <p className="text-red-500 text-xs">{errors.street.message}</p>}
            </div>
            <div className="grid md:grid-cols-3 mt-4 space-x-4">
              <div className="">
                <label className="block text-md font-regular text-gray-900">Suburb</label>
                <input
                  {...register("suburb", { required: "Suburb is required" })}
                  className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                />
                {errors.suburb && <p className="text-red-500 text-xs">{errors.suburb.message}</p>}
              </div>
              <div>
                <label className="block text-md font-regular text-gray-900">State</label>
                <select className="block w-full mt-2 rounded-md border bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                 {...register("state", { required: "State is required" })}>
                  <option value="">State/territory</option>
                  {AUStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
              </div>
              <div className="">
                <label className="block text-md font-regular text-gray-900">Post code</label>
                <input
                  {...register("postCode", { 
                    required: "Post code is required",
                    pattern: {
                      value: /^\d{4}$/,
                      message: "Enter a valid 4-digit postcode"
                    } 
                    })}
                  className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                />
                {errors.postCode && <p className="text-red-500 text-xs">{errors.postCode.message}</p>}
              </div>
            </div>
          </div>
    </div>
  )
}

export default ShippingForm