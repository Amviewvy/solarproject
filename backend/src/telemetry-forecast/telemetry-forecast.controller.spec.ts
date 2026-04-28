import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryForecastController } from './telemetry-forecast.controller';
import { TelemetryForecastService } from './telemetry-forecast.service';

describe('TelemetryForecastController', () => {
  let controller: TelemetryForecastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemetryForecastController],
      providers: [TelemetryForecastService],
    }).compile();

    controller = module.get<TelemetryForecastController>(TelemetryForecastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
