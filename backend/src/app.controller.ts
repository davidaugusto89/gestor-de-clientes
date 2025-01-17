import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@/decorators/public.decorator';

@Controller()
@ApiTags('Health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  @Public()
  @ApiOperation({
    summary: 'Endpoint de teste',
    description: 'Verifica se o servidor está respondendo corretamente.',
  })
  getStatus(): { status: string; timestamp: string } {
    return {
      status: 'Servidor está funcionando',
      timestamp: new Date().toISOString(),
    };
  }
}
