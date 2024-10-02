import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaymentWebhookGuard } from './guards/payment-webhook.guard';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles(Role.STUDENT)
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.create(createPaymentDto);
  }

  // TODO: how should i know that only payment gateways call this?
  @Get('callback/success')
  async success(@Query('invoice_id') invoiceId: string, @Res() res) {
    console.log(`payment.controller.ts invoiceId: `, invoiceId);
    const queryParams = new URLSearchParams({
      invoiceId,
    }).toString();
    // TODO: configure success url
    return res.redirect(`${process.env.ORIGIN}?${queryParams}`);
  }

  @Get('callback/failure')
  async failure(@Query('invoice_id') invoiceId: string, @Res() res) {
    console.log(`payment.controller.ts invoiceId: `, invoiceId);
    const queryParams = new URLSearchParams({
      invoiceId,
    }).toString();
    // TODO: configure failure url
    return res.redirect(`${process.env.ORIGIN}${queryParams}`);
  }

  @UseGuards(PaymentWebhookGuard)
  @Post('webhook/success')
  async acceptPayment(@Body() paidTransactionDto: any) {
    console.log(`payment.controller.ts success webhook: `, paidTransactionDto);
    await this.paymentService.acceptPayment(paidTransactionDto);
    return { message: 'success' };
  }

  @UseGuards(PaymentWebhookGuard)
  @Post('webhook/failure')
  async rejectPayment(@Body() failedTransactionDto: any) {
    console.log(
      `payment.controller.ts failure webhook: `,
      failedTransactionDto,
    );
    await this.paymentService.rejectPayment(failedTransactionDto);
    return { message: 'failure' };
  }

  @Get()
  async findAll() {
    return await this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paymentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return await this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.paymentService.remove(id);
  }
}
