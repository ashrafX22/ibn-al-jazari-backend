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
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

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

  @Post('webhook/success')
  async acceptPayment(@Body() paidPaymentDto: any) {
    console.log(`payment.controller.ts success webhook: `, paidPaymentDto);
    await this.paymentService.acceptPayment(paidPaymentDto);
    return { message: 'success' };
  }

  @Post('webhook/failure')
  async failureWebhook(@Body() failedPaymentDto: any) {
    console.log(`payment.controller.ts failure webhook: `, failedPaymentDto);
    await this.paymentService.rejectPayment(failedPaymentDto);
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
