import { Injectable } from '@angular/core';
import * as bcrypt from "bcryptjs";

@Injectable({
  providedIn: 'root',
})
export class HashingService {
  constructor() {}

    generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  validatePassword(loginPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(loginPassword, hashedPassword);
  }
}
