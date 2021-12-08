import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UsersInfoController } from './users-info.controller';
import { UsersInfoService } from './users-info.service';

@Module({
  imports: [FirebaseModule],
  controllers: [UsersInfoController],
  providers: [UsersInfoService],
})
export class UsersInfoModule {}
