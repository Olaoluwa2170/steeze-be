import { Inject, Injectable } from '@nestjs/common';
import { Sharp } from 'sharp';
import * as path from 'path';
import bwipjs from 'bwip-js';
import TextToSvg from 'text-to-svg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TicketService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}
  getFilePath(fileName: string): string {
    const basePath = this.configService.get('base_path');
    return path.join(basePath, fileName);
  }
  generateSVG(text: string) {
    const textToSVG = TextToSvg.loadSync();
    try {
      const svg = textToSVG.getSVG(text, {
        fontSixe: 110,
        anchor: 'top',
        atrributes: { fill: 'black' },
      });
      return Buffer.from(svg);
    } catch (err) {
      console.log(err);
    }
  }
}
