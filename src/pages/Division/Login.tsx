import Alert from "@/components/ui/alert/Alert";
import { Modal } from "@/components/ui/modal";
import { useUserDivisionActions } from "@/hooks/api/division/useUserDivisionActions";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";

export default function Login() {

  const { login, loading, error } = useUserDivisionActions();
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
        <title>Login Admin Divisi</title>
      </head>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12 lg:px-8">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
              Welcome Admins !!!
            </h2>
          </div>
          {error && (
            <Alert
              variant="error"
              title="Gagal Masuk"
              message={error.toString()}
            />
          )}


          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  onChange={handleOnChange}
                  value={formData.email}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                           outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                           focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  value={formData.password}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                           outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                           focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                         text-sm font-semibold text-white shadow hover:bg-indigo-500 
                         focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
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
