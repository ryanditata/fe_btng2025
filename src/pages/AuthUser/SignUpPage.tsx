import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { useUserActions } from "../../hooks/api/participant/useUserAction";
import Alert from "../../components/ui/alert/Alert";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nama terlalu pendek!")
    .max(255, "Nama terlalu panjang!")
    .required("Nama wajib diisi!"),
  email: Yup.string()
    .email("Email tidak valid!")
    .required("Email wajib diisi!"),
  password: Yup.string()
    .min(6, "Password terlalu pendek!")
    .max(255, "Password terlalu panjang!")
    .required("Password wajib diisi!"),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, error, loading, success } = useUserActions();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // reset error sebelum validasi
      setValidationErrors({});
      // validasi Yup
      await SignUpSchema.validate(formData, { abortEarly: false });

      // kalau lolos validasi, register
      register(formData.name, formData.email, formData.password);

      // reset form
      setFormData({ name: "", email: "", password: "" });
    } catch (err: any) {
      if (err.inner) {
        // Yup return banyak error → mapping jadi object
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((e: any) => {
          formErrors[e.path] = e.message;
        });
        setValidationErrors(formErrors);
      }
    }
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate("/signin/participant");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  return (
    <>
      <head>
        <title>Daftar Peserta</title>
        <meta
          name="description"
          content="Halaman untuk mendaftar sebagai peserta"
        />
      </head>
      <div className="flex flex-row items-center justify-center min-h-screen md:h-full">
        <div className="lg:flex h-screen hidden overflow-y-auto lg:w-[50%]">
          <img
            className="w-full object-cover"
            src="/images/btng/images/bg-auth-user.webp"
            alt=""
          />
        </div>
        <div className="flex flex-col py-10 flex-1 justify-center items-center h-fit lg:w-[50%] no-scrollbar mx-10 lg:ml-30 lg:mr-50">
          <div className="flex flex-col gap-8 justify-center flex-1 w-full lg:w-full md:w-[420px]">
            <h1 className="mb-2 text-[#000000] text-center text-3xl lg:text-left md:text-4xl font-audiowide">
              Daftar
            </h1>
            {error && (
              <Alert
                variant="error"
                title="Gagal Mendaftar"
                message={error.toString()}
              />
            )}
            {success && (
              <Alert
                variant="success"
                title="Berhasil Mendaftar"
                message="Akun Anda telah berhasil dibuat. Silakan masuk."
              />
            )}

            <form className="font-inter" onSubmit={handleOnSubmit}>
              <div className="gap-4">
                {/* Nama */}
                <div className="sm:col-span-1 text-base">
                  <label className="block text-sm font-medium text-[#111928] mb-2.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nama Lengkap"
                    className={`bg-gray-50 border ${
                      validationErrors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-md block w-full p-3 mb-1`}
                    onChange={handleOnChange}
                    value={formData.name}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mb-3">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="gap-0 text-base">
                  <label className="block text-sm font-medium text-[#111928] mb-2.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className={`bg-gray-50 border ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-md block w-full p-3 mb-1`}
                    onChange={handleOnChange}
                    value={formData.email}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mb-3">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="text-base">
                  <label className="block text-sm font-medium text-[#111928] mb-2.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      className={`bg-gray-50 border ${
                        validationErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 text-sm rounded-md block w-full p-3 mb-1`}
                      name="password"
                      onChange={handleOnChange}
                      value={formData.password}
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
                  {validationErrors.password && (
                    <p className="text-red-500 text-sm mb-3">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="text-base flex items-center justify-center my-8 w-full px-4 py-3 font-bold text-white transition rounded-3xl bg-[#000000]"
                  >
                    Daftar
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <p className="text-base font-inter text-center text-[#000000] dark:text-gray-400 sm:text-start">
                  Sudah memiliki akun?{" "}
                  <Link to="/signin/participant" className="text-[#0088FF]">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* LOADING MODAL */}
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
