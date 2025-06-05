export class RegisterDto {
  email: string;
  password: string;
  name?: string;
  role?: 'Customer' | 'Admin' | 'Delivery';
}

