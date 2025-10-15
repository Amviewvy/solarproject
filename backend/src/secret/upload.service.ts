import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MeterMeasurement } from "src/device/entities/meterMeasurement.entity";
import { Repository } from "typeorm";
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as XLSX from 'xlsx';
import { Readable } from "stream";
import { Meter } from "src/device/entities/meter.entity";

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(MeterMeasurement)
    private repo: Repository<MeterMeasurement>,
  ) { }

  async importCsv(file: Express.Multer.File) {
    const results: Record<string, any>[] = [];
    const ext = file.originalname.split('.').pop()?.toLowerCase();

    if (ext === 'csv') {
      // 🧠 อ่านจาก Buffer ด้วย stream (ไม่ใช้ file.path)
      const stream = Readable.from(file.buffer);
      await new Promise<void>((resolve, reject) => {
        stream
          .pipe(csv())
          .on('data', (row: any) => results.push(row))
          .on('end', resolve)
          .on('error', reject);
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      // 🧠 อ่านจาก buffer แทน path
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      results.push(...(data as any[]));
    } else {
      throw new Error('Unsupported file format');
    }


    const entities = this.repo.create(
      results.map((r) => ({
        meter: { id: +r.meter_id } as unknown as Meter,
        measurement_time: new Date(r.measurement_time),

        volts_avg: r.volts_avg ? +r.volts_avg : undefined,
        current_sum: r.current_sum ? +r.current_sum : undefined,
        watt_sum: r.watt_sum ? +r.watt_sum : undefined,

        voltage_1: r.voltage_1 ? +r.voltage_1 : undefined,
        voltage_2: r.voltage_2 ? +r.voltage_2 : undefined,
        voltage_3: r.voltage_3 ? +r.voltage_3 : undefined,

        current_1: r.current_1 ? +r.current_1 : undefined,
        current_2: r.current_2 ? +r.current_2 : undefined,
        current_3: r.current_3 ? +r.current_3 : undefined,

        va_1: r.va_1 ? +r.va_1 : undefined,
        va_2: r.va_2 ? +r.va_2 : undefined,
        va_3: r.va_3 ? +r.va_3 : undefined,

        var_1: r.var_1 ? +r.var_1 : undefined,
        var_2: r.var_2 ? +r.var_2 : undefined,
        var_3: r.var_3 ? +r.var_3 : undefined,

        pf_1: r.pf_1 ? +r.pf_1 : undefined,
        pf_2: r.pf_2 ? +r.pf_2 : undefined,
        pf_3: r.pf_3 ? +r.pf_3 : undefined,

        energy_im: r.energy_im ? +r.energy_im : undefined,
        energy_ex: r.energy_ex ? +r.energy_ex : undefined,
        freq: r.freq ? +r.freq : undefined,

        created_at: r.created_at ? new Date(r.created_at) : new Date(),
      }))
    );

    for (let i = 0; i < entities.length; i += 500) {
      const chunk = entities.slice(i, i + 500);
      await this.repo.save(chunk);
      console.log(`✅ Imported ${i + chunk.length}/${entities.length}`);
    }

    return { message: `✅ Imported ${entities.length} records` };
  }
}