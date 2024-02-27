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
    console.log(basePath, 'yesh');
    return path.join(basePath, fileName);
  }
  generateSVG(text: string) {
    const textToSVG = TextToSvg.loadSync();
    try {
      const svg = textToSVG.getSVG(text, {
        fontSize: 110,
        anchor: 'top',
        atrributes: { fill: 'white', stroke: 'black' },
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
      scale: 5,
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
    // const ticketemplatePath = this.getFilePath(
    //   '/imageFile/Black and White Minimalist Ticket Music Party (1).png',
    // );

    // console.log(ticketemplatePath);

    const ticket = sharp(
      './src/ticket/imageFile/Black and White Minimalist Ticket Music Party (1).png',
    );

    try {
      const barcodeImageBuffer = await this.generateBarcode(ticketId);

      // Generate customer name for ticket as buffer
      const customerNameImageBuffer = await this.generateSVG(customerName);

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

      await ticket
        .composite([barcodeOverlay, qrCodeOverlay, svgOverlay])
        .toFile(outputPath);
    } catch (error) {
      console.log(error);
    }
  }
}
