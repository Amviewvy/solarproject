import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryForecastService } from './telemetry-forecast.service';

describe('TelemetryForecastService', () => {
  let service: TelemetryForecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetryForecastService],
    }).compile();

    service = module.get<TelemetryForecastService>(TelemetryForecastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
