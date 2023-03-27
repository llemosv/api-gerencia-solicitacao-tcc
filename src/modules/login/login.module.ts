import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleSchema } from './interfaces/schemas/people.schema';

import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'People', schema: PeopleSchema }]),
    JwtModule.register({
      secret: String(process.env.JWT_SECRET_KEY),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [],
})
export class LoginModule { }
