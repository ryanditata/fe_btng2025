import { useState, useEffect  } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom"; 
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { useUserActions } from "../../hooks/api/participant/useUserAction";
import Alert from "../../components/ui/alert/Alert";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { useDataPeserta } from "@/context/GlobalDataPesertaContext";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useUserActions();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const {closeModal } = useModal();
  const navigate = useNavigate();
  const { auth, divisions } = useDataPeserta();

  const isProfileComplete = (user: any) => {
    return (
      user?.name &&
      user?.nim &&
      user?.email &&
      user?.phone &&
      user?.prodi &&
      user?.semester &&
      user?.link_twibon &&
      user?.link_tiktok &&
      user?.link_instagram
    );
  };

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

  useEffect(() => {
    if (auth.user) {
      if (isProfileComplete(auth.user)) {
        divisions.mutateDivisions()
        navigate("/participant/class");
      } else {
        navigate("/participant/profile");
      }
    }
  }, [auth.user, navigate]);

  return (
    <>
     <head>
      <title>Masuk Peserta</title>
      <meta name="description" content="Halaman untuk masuk sebagai peserta" />
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
              Masuk
            </h1>
            {error && (
              <Alert
                variant="error"
                title="Gagal Masuk"
                message={error.toString()}
              />
            )}
            <form className="font-inter" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="sm:col-span-1 text-base">
                  <label className="block text-sm font-medium text-[#111928] mb-2.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3 mb-4"
                    onChange={handleOnChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="text-base">
                  <label className="block text-sm font-medium text-[#111928] mb-2.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3"
                      onChange={handleOnChange}
                      name="password"
                      value={formData.password}
                      required
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
              </div>
              <div>
                <button
                  type="submit"
                  className="text-base flex items-center justify-center my-8 w-full px-4 py-3 font-bold text-white transition rounded-3xl bg-[#000000]"
                >
                  Masuk
                </button>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-base font-inter text-center text-[#000000] dark:text-gray-400 sm:text-start">
                  Belum memiliki akun? {""}
                  <Link to="/signup/participant" className="text-[#0088FF]">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
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
