import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser , FaLock } from 'react-icons/fa'; // Mengimpor ikon dari react-icons
import { APISource } from '../../data/source-api';
import { jwtDecode } from 'jwt-decode';
export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State untuk loading

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Silakan isi semua kolom');
      return;
    }
  
    setLoading(true); // Set loading menjadi true sebelum memulai login
  
    try {
      const data = await APISource.login(email, password);
      if (data) {
        console.log('Login berhasil:', data);
        // Simpan accessToken di localStorage atau state sesuai kebutuhan
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken',refreshToken);


        // Decode token untuk mendapatkan informasi pengguna
        const decodedToken = jwtDecode(accessToken);
        console.log('Decoded Token:', decodedToken);
        const userId = decodedToken.id;
        console.log('User ID:', userId);
        localStorage.setItem('userId', userId);

        // simpan gender ke localStorage
        onLogin(); // Panggil fungsi untuk mengubah status login
        navigate('/'); // Arahkan ke halaman utama setelah login berhasil
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat login');
    } finally {
      setLoading(false); // Set loading menjadi false setelah proses selesai
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="bg-white shadow-2xl rounded-lg p-10 max-w-sm w-full transition-transform transform">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Selamat Datang Kembali</h2>
        <form className="space-y-6" id="loginForm" onSubmit={handleLogin}>
          <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
            <FaUser  className="text-gray-400 mr-2" />
            <input
              type="email"
              className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 rounded-lg transition duration-300 hover:shadow-xl transform hover:translate-y-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Nonaktifkan tombol jika loading
            >
              {loading ? 'Memuat...' : 'Login'}
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p>
              Belum punya akun?&nbsp;
              <button
                type="button"
                className="text-orange-600 font-semibold hover:underline"
                onClick={() => navigate('/signup')}
              >
                Daftar
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
  }

export default Login