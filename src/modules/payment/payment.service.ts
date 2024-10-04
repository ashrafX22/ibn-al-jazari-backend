import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/models/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentStatus } from 'src/models/enums/payment-status.enum';
import { StudentService } from '../student/student.service';
import { ClassroomService } from '../classroom/classroom.service';
import { PaymentGatewayServiceFactory } from './factories/payment-gateway-service.factory';
import { CreatePaymentDetails } from './interfaces/create-payment-details.interface';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly paymentGatewayServiceFactory: PaymentGatewayServiceFactory,
    private readonly studentService: StudentService,
    private readonly classroomService: ClassroomService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    const { studentId, classroomId, month, paymentGateway, paymentMethod } =
      createPaymentDto;

    const classroom =
      await this.classroomService.findPaymentDetailsByClassroomId(classroomId);
    const student = await this.studentService.findById(studentId);

    const existingPayment = await this.paymentRepository.findOneBy({
      studentId,
      classroomId,
      month,
    });

    if (existingPayment) {
      throw new ConflictException(
        'a payment with the exact same data already exists',
      );
    }

    // create a payment in database
    const payment = this.paymentRepository.create({
      amount: classroom.subjectPrice,
      ...createPaymentDto,
    });
    const savedPayment = await this.paymentRepository.save(payment);

    const createPaymentDetails: CreatePaymentDetails = {
      id: savedPayment.id,
      student,
      classroom,
      month,
      paymentMethod,
    };

    // create a payment using payment gateway
    const paymentGatewayService =
      this.paymentGatewayServiceFactory.getPaymentGatewayService(
        paymentGateway,
      );

    const gatewayPayment =
      await paymentGatewayService.create(createPaymentDetails);

    return this.findOne(savedPayment.id);
  }

  // TODO: dynamically extract order id based on payment gateway
  async acceptPayment(paidTransactionDto: any) {
    const { invoice_id } = paidTransactionDto;
    const payment = this.paymentRepository.findOneBy({
      paymentGatewayOrderId: invoice_id,
      status: PaymentStatus.PENDING,
    });

    if (!payment) {
      throw new NotFoundException(
        `There is no pending payment with the paymentGatewayOrderId ${invoice_id}.`,
      );
    }

    await this.paymentRepository.update(
      { paymentGatewayOrderId: invoice_id },
      { status: PaymentStatus.PAID },
    );
  }

  async rejectPayment(failedTransactionDto: any) {
    const { invoice_id } = failedTransactionDto;
    const payment = this.paymentRepository.findOneBy({
      paymentGatewayOrderId: invoice_id,
      status: PaymentStatus.PENDING,
    });

    if (!payment) {
      throw new NotFoundException(
        `There is no pending payment with the paymentGatewayOrderId ${invoice_id}.`,
      );
    }

    await this.paymentRepository.update(
      { paymentGatewayOrderId: invoice_id },
      { status: PaymentStatus.FAILED },
    );
  }

  async findAll(): Promise<PaymentEntity[]> {
    const payments = await this.paymentRepository.find();

    if (!payments) return null;

    return payments.map((payment) => new PaymentEntity(payment));
  }

  async findOne(id: string): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOneBy({ id });

    if (!payment) return null;

    return new PaymentEntity(payment);
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    await this.paymentRepository.update(id, updatePaymentDto);
    const updatedPayment = await this.paymentRepository.findOneBy({ id });

    if (!updatedPayment) {
      throw new NotFoundException('Payment not found.');
    }

    return new PaymentEntity(updatedPayment);
  }

  async remove(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });

    if (!payment) return null;

    await this.paymentRepository.delete(id);
  }
}
