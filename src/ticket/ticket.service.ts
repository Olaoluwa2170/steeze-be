import { Inject, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';
import * as bwipjs from 'bwip-js';
import * as TextToSvg from 'text-to-svg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TicketService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}
  getFilePath(fileName: string): string {
    const basePath = this.configService.get('base_url');
    return path.join(basePath, fileName);
  }
  generateSVG(text: string) {
    const textToSVG = TextToSvg.loadSync();
    try {
      const svg = textToSVG.getSVG(text, {
        fontSize: 70,
        anchor: 'top',
        atrributes: { fill: 'red', stroke: 'black' },
      });
      return Buffer.from(svg);
    } catch (err) {
      console.log(err);
    }
  }
  async generateQRCode(text: string) {
    const qrcodeBuffer = await bwipjs.toBuffer({
      bcid: 'qrcode',
      text,
      scale: 3,
      textcolor: 'ffffff',
    });
    return qrcodeBuffer;
  }

  generateBarcode(text: string) {
    const svg = bwipjs.toSVG({
      bcid: 'code128',
      text,
      width: 80,
      textxalign: 'center',
      textcolor: 'ff0000',
      rotate: 'L',
    });
    return Buffer.from(svg);
  }

  async createTicket(customerName, ticketId, outputPath) {
    const ticketemplatePath = this.getFilePath(
      '/ticket/imageFile/Black and White Minimalist Ticket Music Party (1).png',
    );
    const ticket = sharp(ticketemplatePath);

    try {
      const barcodeImageBuffer = this.generateBarcode(ticketId);

      // Generate customer name for ticket as buffer
      const customerNameImageBuffer = this.generateSVG(customerName);

      const qrcodeImageBuffer = await this.generateQRCode(ticketId);

      const qrCodeOverlay = {
        input: qrcodeImageBuffer,
        top: 210, // X position for QR code
        left: 290, // Y position for QR code
      };

      const barcodeOverlay = {
        input: barcodeImageBuffer,
        left: 1427,
        top: 210,
      };

      // Params to overlay SVG onto the template
      const svgOverlay = {
        input: customerNameImageBuffer,
        top: 256,
        left: 637,
      };
      const getoutputPath = this.getFilePath(outputPath);
      await ticket
        .composite([barcodeOverlay, qrCodeOverlay, svgOverlay])
        .toFile(getoutputPath);
    } catch (error) {
      console.log(error);
    }
  }
}
