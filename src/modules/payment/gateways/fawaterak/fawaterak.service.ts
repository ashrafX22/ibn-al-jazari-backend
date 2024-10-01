import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { FawaterakPaymentMethodId } from './fawaterak-payment-method-id.enum';
import { IPaymentGatewayService } from '../../interfaces/payment-gateway-service.interface';
import { CreatePaymentDetails } from '../../interfaces/create-payment-details.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/models/entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FawaterakPaymentGatewayService implements IPaymentGatewayService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly httpService: HttpService,
  ) {}

  async findPaymentMethods(): Promise<AxiosResponse<any>> {
    const url = 'https://staging.fawaterk.com/api/v2/getPaymentmethods';
    // const url = 'https://app.fawaterk.com/api/v2/getPaymentmethods';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.FAWATERAK_API_KEY_STAGING}`,
      // Authorization: `Bearer ${process.env.FAWATERAK_API_KEY}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  async create(
    createPaymentDetails: CreatePaymentDetails,
  ): Promise<AxiosResponse<any>> {
    const { id, paymentMethod } = createPaymentDetails;

    // TODO: add typing to classroom, payment month
    const classroom = createPaymentDetails.classroom;
    const student = createPaymentDetails.student;
    const [firstName, ...rest] = student.name.split(' ');
    const lastName = rest.join(' ');

    const url = 'https://staging.fawaterk.com/api/v2/invoiceInitPay';
    // const url = 'https://app.fawaterk.com/api/v2/invoiceInitPay';

    const callbackUrl = `${process.env.BACKEND_URL}/api/payment/callback`;

    const body = {
      payment_method_id: FawaterakPaymentMethodId[paymentMethod],
      cartTotal: classroom.subjectPrice,
      currency: 'EGP',
      customer: {
        first_name: firstName,
        last_name: lastName || 'x',
        email: student.email,
        phone: student.phoneNumber,
        address: 'x',
      },
      redirectionUrls: {
        successUrl: `${callbackUrl}/success`,
        failUrl: `${callbackUrl}/failure`,
        pendingUrl: `${callbackUrl}/pending`,
      },
      cartItems: [
        {
          name: classroom.name,
          price: classroom.subjectPrice,
          quantity: '1',
        },
      ],
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.FAWATERAK_API_KEY_STAGING}`,
      // `Bearer ${process.env.FAWATERAK_API_KEY}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );

      const { invoice_id } = response.data['data'];
      console.log(`fawaterak.service.ts invoice_id: `, invoice_id);

      // update paymentGatewayOrderId
      await this.paymentRepository.update(id, {
        paymentGatewayOrderId: invoice_id,
      });

      console.log(`fawaterak.service.ts response.data: `, response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }
}
