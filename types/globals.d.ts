import { Roles } from '@/lib/auth';
declare global {
  interface CustomJwtSessionClaims {
    roles: Roles[];
  }
}
