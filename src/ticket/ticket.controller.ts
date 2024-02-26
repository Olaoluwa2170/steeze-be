import { Controller, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Get('/generate')
  generateTicket() {
    const name = 'Likita-benjamin';
    return this.ticketService.createTicket(
      name,
      'ticket-id-likita',
      `./output/${name}-ticket.png`,
    );
  }
}
