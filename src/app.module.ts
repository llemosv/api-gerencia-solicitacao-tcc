import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './modules/login/login.module';
import { PeopleModule } from './modules/people/people.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://llemos:O4eUn4DvNGcpLwFJ@dbuniaraxa.9cnnbgc.mongodb.net/uniaraxa?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    PeopleModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
