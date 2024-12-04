import donation from "../../assets/pipp.svg";
import gambar from "../../assets/gambar.svg";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto p-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center p-8 animate-fade-in">
            <p 
              
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform"
            >
              ✨ Ubah Barangmu Jadi Senyuman!
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Setiap barang memiliki cerita baru. Biarkan barangmu melanjutkan perjalanan dan memberikan kebahagiaan untuk orang lain.
            </p>
            <p className="text-lg text-gray-600">
              Bersama kita wujudkan #IndonesiaPeduliSesama 🤝
            </p>
            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 w-fit">
              ✋ Ayo Mulai Berbagi!
            </button>
          </div>

          <div className="flex justify-center items-center p-4 hover:scale-105 transition-transform duration-300">
            <img className="svgImg w-full max-w-md filter drop-shadow-xl" src={donation} alt="Donation" />
          </div>

          <div className="flex justify-center items-center p-4 hover:scale-105 transition-transform duration-300">
            <img className="svgImg w-full max-w-md filter drop-shadow-xl" src={gambar} alt="Image" />
          </div>

          <div className="flex flex-col justify-center p-8 space-y-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              🌟 Mengapa Bergabung Dengan Kami?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              <span className="font-semibold text-blue-600">✓ Mudah:</span> Cukup 3 langkah untuk mulai berbagi<br/>
              <span className="font-semibold text-blue-600">✓ Aman:</span> Verifikasi pengguna & tracking donasi<br/>
              <span className="font-semibold text-blue-600">✓ Bermanfaat:</span> Langsung tersalur ke yang membutuhkan<br/>
              <span className="font-semibold text-blue-600">✓ Berkah:</span> Kurangi sampah, tingkatkan pahala! 
            </p>
            <div className="flex gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <span className="font-bold text-blue-600 text-xl">25.000+</span>
                <p className="text-gray-600">😊 Penerima Manfaat</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <span className="font-bold text-purple-600 text-xl">50.000+</span>
                <p className="text-gray-600">🎁 Barang Tersalurkan</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic mt-4">
              "Berbagi tidak akan membuatmu miskin, justru memperkaya jiwamu." 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};