
const AlertCompleteProfile = () => {
    return (
        <div className="bg-btng-red/10 rounded-xl p-4 mb-6" role="alert">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-white  rounded-full mr-4">
                    <img src={"/images/vector/alert.svg"} alt="Alert Icon" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="">
                    <p className="font-semibold text-xl">Lengkapi data diri</p>
                    <p>Untuk dapat memilih divisi dan sesi kelas</p>
                </div>
            </div>
        </div>
    )
}

export default AlertCompleteProfile