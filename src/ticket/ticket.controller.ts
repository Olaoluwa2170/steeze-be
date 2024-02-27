import { Controller, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Get('/generate')
  generateTicket() {
    const name = 'Elisha';
    return this.ticketService.createTicket(
      name,
      'ticket-id-likita',
      `./src/ticket/output/${name}-ticket.png`,
    );
  }
}
