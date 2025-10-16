import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MeterMeasurement } from "src/device/entities/meterMeasurement.entity";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
  imports: [TypeOrmModule.forFeature([MeterMeasurement])],
  controllers: [UploadController],
  providers: [UploadService],
})

export class UploadModule { }