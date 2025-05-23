import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const PasswordInput = ({ label, register, name, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="block text-lg font-secondary font-regular text-gray-900">
        {label}
      </label>
      <input
        type={show ? "text" : "password"}
        {...register(name)}
        className="block w-full mt-2 rounded-md border bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 bottom-3 text-gray-500"
      >
        {show ? (
          <EyeSlashIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};
PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default PasswordInput;
