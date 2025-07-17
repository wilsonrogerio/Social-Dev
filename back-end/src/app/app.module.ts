import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [ AuthModule , UsersModule , PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
