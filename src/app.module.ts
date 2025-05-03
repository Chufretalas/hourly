import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { dataSourceOptions } from "./data_source"
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ActivitiesModule } from './activities/activities.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ClientsModule,
    ActivitiesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
