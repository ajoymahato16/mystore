export interface User {
    id: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    gender?: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }