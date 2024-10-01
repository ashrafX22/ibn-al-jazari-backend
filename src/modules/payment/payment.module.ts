import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/models/entities/payment.entity';
import { StudentModule } from '../student/student.module';
import { ClassroomModule } from '../classroom/classroom.module';
import { PaymentGatewayServiceFactory } from './factories/payment-gateway-service.factory';
import { FawaterakPaymentGatewayService } from './gateways/fawaterak/fawaterak.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    HttpModule,
    StudentModule,
    ClassroomModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentGatewayServiceFactory,
    FawaterakPaymentGatewayService,
  ],
})
export class PaymentModule {}
