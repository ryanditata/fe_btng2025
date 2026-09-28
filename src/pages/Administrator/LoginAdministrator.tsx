import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useUserAdministratorActions } from "@/hooks/api/administrator.ts/useUserAdministratorActions";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Alert from "@/components/ui/alert/Alert";

export default function LoginAdministrator() {
  const [showPassword, setShowPassword] = useState(false);


  const { login, loading, error } = useUserAdministratorActions();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { closeModal } = useModal();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(
      formData.email,
      formData.password
    );
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <head>
        <title>Login Admin</title>
      </head>
      <div className="relative flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900">
        {/* Form login */}
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex flex-col flex-1">
            <div className="w-full max-w-md pt-10 mx-auto">
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
              <div>
                <div className="mb-5 sm:mb-8">
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Login untuk Admin
                  </p>
                  <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md text-center">
                    Sign In To Your Account
                  </h1>
                </div>
                {error && (
                  <Alert
                    variant="error"
                    title="Gagal Masuk"
                    message={error.toString()}
                  />
                )}
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <Label>
                          Email Address <span className="text-error-500">*</span>{" "}
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          placeholder="info@gmail.com"
                          name="email"
                          onChange={handleOnChange}
                        />
                      </div>
                      <div>
                        <Label>
                          Password <span className="text-error-500">*</span>{" "}
                        </Label>
                        <div className="relative">
                          <Input
                            value={formData.password}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            name="password"
                            onChange={handleOnChange}
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                          >
                            {showPassword ? (
                              <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                            ) : (
                              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          to="/reset-password"
                          className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div>
                        <button className="w-full bg-btng-blue hover:bg-btng-blue/90 py-3 rounded-lg text-white font-medium transition">
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="mt-5">
                    <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
                      Don&apos;t have an account? {""}
                      <Link
                        to="/signup"
                        className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={loading} onClose={closeModal} className="max-w-sm">
        <div className="flex flex-col items-center justify-center p-6">
          <h2 className="text-lg font-semibold">Tunggu Sebentar</h2>
          <div className="flex items-center justify-center my-10">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
          <p className="text-center">
            Silakan tunggu sementara kami memproses permintaan Anda.
          </p>
        </div>
      </Modal>
    </>

  );
}