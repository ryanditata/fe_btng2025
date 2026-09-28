import Label from '../../components/form/Label'
import Input from '../../components/form/input/InputField'
import ComponentCardParticipants from '../../components/participants/ComponentsCardParticipants'
import Select from '../../components/form/Select'
import FileInput from '../../components/form/input/FileInput'
import { useEffect, useState } from 'react'
import { useDataPeserta } from '@/context/GlobalDataPesertaContext'
import { useUserActions } from '@/hooks/api/participant/useUserAction'
import { Modal } from '@/components/ui/modal'
import { useModal } from '@/hooks/useModal'
import Alert from '@/components/ui/alert/Alert'
import { imageUrl } from '@/services/imageURL'

import * as Yup from 'yup'
import AlertCompleteProfile from '@/components/participants/AlertCompleteProfile'

const profileSchema = Yup.object().shape({
  name: Yup.string().required("Nama lengkap wajib diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  nim: Yup.string().required("NIM wajib diisi"),
  prodi: Yup.string().required("Program Studi wajib dipilih"),
  semester: Yup.number()
    .typeError("Semester harus berupa angka")
    .min(1, "Minimal semester 1")
    .max(10, "Maksimal semester 10")
    .required("Semester wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Nomor Whatsapp hanya boleh angka")
    .required("Nomor Whatsapp wajib diisi"),
  link_twibbon: Yup.string().url("Format link twibbon tidak valid").nullable(),
  file_tiktok: Yup.mixed().nullable(),
  file_instagram: Yup.mixed().nullable(),
  password: Yup.string().min(6, 'Password minimal 6 karakter').nullable(),
  password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Konfirmasi password tidak sesuai').nullable(),
});

const Profile = () => {
  const { closeModal } = useModal();
  const listProdi = [
    { value: "S1 Teknik Informatika", label: "S1 - Teknik Informatika" },
    { value: "S1 Sistem Informasi", label: "S1 - Sistem Informasi" },
    {
      value: "S1 Desain Komunikasi Visual",
      label: "S1 - Desain Komunikasi Visual",
    },
    { value: "D3 Teknik Informatika", label: "D3 - Teknik Informatika" },
    { value: "D3 Broadcasting", label: "D3 - Broadcasting" },

    { value: "D4 Animasi", label: "D4 - Animasi" },
    { value: "S1 Ilmu Komunikasi", label: "S1 - Ilmu Komunikasi" },


    { value: "S1 Teknik Elektro", label: "S1 - Teknik Elektro" },
    { value: "S1 Teknik Industri", label: "S1 - Teknik Industri" },
    { value: "S1 Teknik Biomedis", label: "S1 - Teknik Biomedis" },

    { value: "S1 Akuntansi", label: "S1 - Akuntansi" },
    { value: "S1 Manajemen", label: "S1 - Manajemen" },

    { value: "S1 Bahasa Inggris", label: "S1 - Bahasa Inggris" },
    { value: "S1 Sastra Jepang", label: "S1 - Sastra Jepang" },

    { value: "S1 Kesehatan Masyarakat", label: "S1 - Kesehatan Masyarakat" },
    { value: "S1 Kesehatan Lingkungan", label: "S1 - Kesehatan Lingkungan" },
    { value: "D3 Rekam Medis", label: "D3 - Rekam Medis" },
    { value: "S1 Kedokteran", label: "S1 - Kedokteran" },



  ];

  const listSemester = [
    {
      value: '1', label: 'Semester 1'
    },
    {
      value: '2', label: 'Semester 2'
    },
    {
      value: '3', label: 'Semester 3'
    },
    {
      value: '4', label: 'Semester 4'
    },
    {
      value: '5', label: 'Semester 5'
    },
    {
      value: '6', label: 'Semester 6'
    },
    {
      value: '7', label: 'Semester 7'
    },
    {
      value: '8', label: 'Semester 8'
    },
    {
      value: '9', label: 'Semester 9'
    },
    {
      value: '10', label: 'Semester 10'
    }
  ]

  const { auth } = useDataPeserta()
  const { updateProfile, loading, error, success } = useUserActions()
  const [closedRegister, setClosedRegister] = useState(false);



  useEffect(() => {
    if (!auth.user?.prodi || !auth.user?.phone || !auth.user?.semester || !auth.user?.nim || !auth.user?.link_tiktok || !auth.user?.link_instagram || !auth.user?.link_twibon) {
      setClosedRegister(true);
    } else {
      setClosedRegister(false);
    }
  }, [auth.user]);

  const [userData, setUserData] = useState({
    name: auth.user?.name || "",
    nim: auth.user?.nim || "",
    email: auth.user?.email || "",
    phone: auth.user?.phone || "",
    prodi: auth.user?.prodi || "",
    semester: auth.user?.semester || "",
    password: auth.user?.password || "",
    link_twibon: auth.user?.link_twibon || "",
    link_tiktok: auth.user?.link_tiktok || "",
    link_instagram: auth.user?.link_instagram || "",
    password_confirmation: auth.user?.password_confirmation || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [files, setFiles] = useState({
    tiktok: null as File | null,
    instagram: null as File | null,
  });

  const handleSelectChange = (name: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeFileTiktok = (file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      tiktok: file,
    }));
  };

  const handleChangeFileInstagram = (file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      instagram: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileSchema.validate(
        {
          ...userData,
          file_tiktok: files.tiktok,
          file_instagram: files.instagram,
        },
        { abortEarly: false } // supaya semua error muncul
      );

      setErrors({}); // clear error kalau lolos validasi

      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (files.tiktok) formData.append("file_tiktok", files.tiktok);
      if (files.instagram) formData.append("file_instagram", files.instagram);

      formData.append("_method", "PUT");

      await updateProfile(formData);
    } catch (validationErr: any) {
      if (validationErr.inner) {
        const formErrors: Record<string, string> = {};
        validationErr.inner.forEach((err: any) => {
          if (err.path) {
            formErrors[err.path] = err.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  if (auth.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <head>
        <title>Profile Diri</title>
        <meta name="description" content="Halaman Profile Diri Peserta" />
      </head>
      <div>
        <ComponentCardParticipants>
          <form onSubmit={handleSubmit}>
            <p className='font-family-audiowide text-4xl mb-6'>Profile Diri</p>
            {closedRegister ? (
              <AlertCompleteProfile />
            ) : null}
            {
              error && <Alert
                variant="error"
                title="Gagal Memperbarui Profil"
                message={error?.toString() || ""}
              />
            }
            {
              success && <Alert
                variant="success"
                title="Berhasil Memperbarui Profil"
                message="Anda telah berhasil memperbarui profil."
              />
            }
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-4">
              <div className="space-y-4 border-r pr-10">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Masukkan email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="nim">NIM</Label>
                  <Input
                    type="text"
                    id="nim"
                    placeholder="Masukkan NIM"
                    name="nim"
                    value={userData.nim}
                    onChange={handleInputChange}
                  />
                  {errors.nim && <p className="text-red-500 text-sm mt-1">{errors.nim}</p>}
                </div>
                <div>
                  <Label>Program Studi</Label>
                  <Select
                    options={listProdi}
                    placeholder="Pilih Program Studi"
                    defaultValue={userData.prodi}
                    onChange={(val) => handleSelectChange('prodi', val)}
                  />
                  {errors.prodi && <p className="text-red-500 text-sm mt-1">{errors.prodi}</p>}
                </div>
                <div>
                  <Label>Semester</Label>
                  <Select
                    options={listSemester}
                    placeholder="Pilih Semester"
                    defaultValue={userData.semester}
                    onChange={(val) => handleSelectChange('semester', val)}
                  />
                  {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
                </div>
                <div>
                  <Label>No. Whatsapp</Label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Masukkan No. Whatsapp"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-4 mt-5 lg:mt-0 lg:border-l lg:pl-10">
                <div>
                  <Label>
                    Bukti Follow TikTok
                    <span>
                      <a href="https://www.tiktok.com/@dnccsemarang" target="_blank" rel="noopener noreferrer" className="text-btng-blue hover:underline ml-1">
                        @dnccsemarang
                      </a>
                    </span>
                  </Label>
                  <FileInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFileTiktok(e.target.files ? e.target.files[0] : null)} />
                  {userData.link_tiktok && (
                    <a href={imageUrl(String(userData.link_tiktok))} target="_blank" rel="noopener noreferrer" className="text-btng-blue hover:underline text-xs">
                      Lihat Link TikTok Anda
                    </a>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Format file: .jpg, .jpeg, .png | Maksimal 2MB</p>
                  {errors.file_tiktok && <p className="text-red-500 text-sm mt-1">{errors.file_tiktok}</p>}
                </div>
                <div>
                  <Label>
                    Bukti Follow Instagram
                    <span>
                      <a href="https://www.instagram.com/dnccsemarang/" target="_blank" rel="noopener noreferrer" className="text-btng-blue hover:underline ml-1">
                        @dnccsemarang
                      </a>
                    </span>
                  </Label>
                  <FileInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFileInstagram(e.target.files ? e.target.files[0] : null)} />
                  {userData.link_instagram && (
                    <a href={imageUrl(String(userData.link_instagram))} target="_blank" rel="noopener noreferrer" className="text-btng-blue hover:underline text-xs">
                      Lihat Link Instagram Anda
                    </a>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Format file: .jpg, .jpeg, .png | Maksimal 2MB</p>
                  {errors.file_instagram && <p className="text-red-500 text-sm mt-1">{errors.file_instagram}</p>}
                </div>
                <div>
                  <Label>Link Twibbon <span>
                    <a href="https://twibbo.nz/btng2025" target="_blank" rel="noopener noreferrer" className="text-btng-blue hover:underline text-xs">
                      Template Twibbon
                    </a>
                  </span>
                  </Label>

                  <Input
                    type="text"
                    name="link_twibbon"
                    placeholder="Masukkan link twibbon"
                    value={
                      typeof userData.link_twibon === "string"
                        ? userData.link_twibon
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                  {errors.link_twibbon && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.link_twibon}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Password <span>
                    <span className="text-gray-500 text-xs italic">
                      (Kosongkan jika tidak ingin mengubah password)
                    </span>
                  </span>
                  </Label>

                  <Input
                    type="password"
                    name="password"
                    placeholder="Masukkan password baru"
                    value={
                      typeof userData.password === "string"
                        ? userData.password
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Konfirmasi Password Baru
                  </Label>

                  <Input
                    type="password"
                    name="password_confirmation"
                    placeholder="Masukkan konfirmasi password baru"
                    value={
                      typeof userData.password_confirmation === "string"
                        ? userData.password_confirmation
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password_confirmation}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="ml-2 bg-btng-black text-white px-4 py-2 rounded hover:bg-btng-black/60"
              >
                Simpan
              </button>
            </div>
          </form>
        </ComponentCardParticipants>
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
};

export default Profile;
