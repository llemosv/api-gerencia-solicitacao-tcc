import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './modules/login/login.module';
import { PeopleModule } from './modules/people/people.module';
import { SolicitationModule } from './modules/solicitations/solicitation.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://llemos:O4eUn4DvNGcpLwFJ@dbuniaraxa.9cnnbgc.mongodb.net/uniaraxa?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ),
    PeopleModule,
    LoginModule,
    SolicitationModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
