import { HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { IUserInfo } from 'src/firebase/interfaces';

@Injectable()
export class UsersInfoService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async addUserInfo(userId: string, email: string): Promise<HttpStatus> {
    return this.firebaseService.addNewUserInfo(userId, email);
  }

  async getUserInfo(userId: string): Promise<IUserInfo> {
    return this.firebaseService.getUserInfo(userId);
  }
}
