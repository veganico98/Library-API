import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Biblioteca-api-Nicolas. Escolha um livro, empreste ou devolva. Faça silêncio!';
  }
}
