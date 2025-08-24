import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'nestJs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    autoLoadEntities: true, // finds all @Entity() classes automatically
    // synchronize: true
  }),
  UsersModule ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
