import axios from 'axios';
export const API = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiYWRtaW4iOnRydWUsImlkIjoxLCJpYXQiOjE1OTA0NTAxODV9.K8TyBNi09PYwGn0Km9K558fRjG7Ywn_fnDVRIoJ29SA',
  }
});