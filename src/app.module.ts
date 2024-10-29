import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PropertyController } from './property/property.controller';
import { LandlordModule } from './landlord/landlord.module';
import { LandlordController } from './landlord/landlord.controller';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://opeyemifamosipe:B4HRuIrNs7ju1cyG@cluster0.tuyth.mongodb.net/project_cog?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    UserModule,
    AuthModule,
    PropertyModule,
    LandlordModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('').forRoutes(PropertyController, LandlordController);
  }
}