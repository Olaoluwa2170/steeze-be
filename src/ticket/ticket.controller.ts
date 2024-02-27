import { Controller, Post, Body } from '@nestjs/common';
import { TicketService } from './ticket.service';

type TicketBody = {
  name: string;
  url: string;
  redeem_code?: string;
};
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('/generate')
  generateTicket(@Body() ticketBody: TicketBody) {
    const { name: customerName, url, redeem_code } = ticketBody;
    const highfinedName = customerName.toLowerCase().replace(' ', '-');
    return this.ticketService.createTicket(
      highfinedName,
      `${url}$redeemcode=${redeem_code}`,
      `/ticket/output/${customerName}-ticket.png`,
    );
  }
}
