import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
    


    // Placeholder method for dashboard service
    getDashboard(): string {
        // In a real application, this method would fetch data from a database or other data source.
        return 'Dashboard data';
    }

    getEnergyData(): string {        // In a real application, this method would fetch energy data from a database or other data source.
        return 'Energy data';
    }
}
