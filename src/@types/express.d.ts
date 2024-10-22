import { Role } from '../../prisma';

declare namespace Express {
  export interface Request {
    user?: {
      userId: number;
      role: Role;
    };
  }
}
