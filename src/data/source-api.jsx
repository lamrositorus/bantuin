import { API_ENDPOINT } from "../globals/Api-endpoint";
import { jwtDecode } from "jwt-decode";
export class APISource {
    //users
    static async register(namaLengkap, email, password, telepon, jenisKelamin, alamat) {
        const response = await fetch(API_ENDPOINT.regis, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                fullname: namaLengkap,
                phone_number: telepon,
                email: email,
                password: password,
                address: alamat,
                gender: jenisKelamin,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Pendaftaran gagal');
        }

        const responseJson = await response.json();
        return responseJson.data;
    }
    static async getProfile(userId) {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(API_ENDPOINT.profile(userId), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                
            },
        });
        if (!response.ok) {
            const errorData = await response.json();            
            throw new Error(errorData.message || 'Gagal mendapatkan profil');
        }
        const responseJson = await response.json();
        return responseJson.data.user;
    }
    static async updateProfile(userId, updatedData) {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(API_ENDPOINT.profile(userId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                
            },
            body: JSON.stringify({
                fullname: updatedData.fullname,
                email: updatedData.email,
                password: updatedData.password,
                phone_number: updatedData.phone_number,
                gender: updatedData.gender,
                address: updatedData.address
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal mengupdate profil');
        }

        const responseJson = await response.json();
        return responseJson;
    }

    //authentication
    static async login(email, password) {
        const response = await fetch(API_ENDPOINT.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login gagal');
        }
        
        const responseJson = await response.json();
        const accessToken = responseJson.data.accessToken; // Pastikan ini sesuai dengan struktur respons API Anda
        const refreshToken = responseJson.data.refreshToken; // Pastikan ini sesuai dengan struktur respons API Anda
        
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.id;
        console.log('User ID:', userId);
        localStorage.setItem('userId', userId);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        return responseJson.data;
    }
    static async deleteAuthentication(){
        const response = await fetch(API_ENDPOINT.authentication, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: localStorage.getItem('refreshToken'),
            })            
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Logout gagal');            
        }        
        return response.json();
        
    }
    static async refreshToken() {
        const response = await fetch(API_ENDPOINT.authentication, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: localStorage.getItem('refreshToken'),
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Refresh token gagal');
        }

        const responseJson = await response.json();
        const accessToken = responseJson.data.accessToken;
        const refreshToken = responseJson.data.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return responseJson.data;
    }
    

    //request
    static async addNewRequest(disasterId, description, requestItems) {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(API_ENDPOINT.request, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                disasterId,
                description,
                requestItems: requestItems.map(item => ({
                    categoryId: item.categoryId,
                    quantity: item.quantity,
                    unitId: item.unitId,
                    description: item.description
                }))
            }),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal menambahkan permintaan');
        }
    
        return await response.json();
    }
    
}