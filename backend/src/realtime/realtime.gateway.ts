import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'https://exymc.eng.nu.ac.th'],
    credential: true,
  }, // allow all origins during development
})
export class RealtimeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RealtimeGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('✅ WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`🟢 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.warn(`🔴 Client disconnected: ${client.id}`);
  }

  emitMeasurementUpdated(deviceId: string) {
    this.server.emit('measurement.updated', {
      deviceId,
      message: 'new measurement saved',
      timestamp: new Date().toISOString(),
    });
  }

  // You can define a function to emit updates
  sendNewDataUpdate(data: any) {
    this.server.emit('newData', data);
  }

  sendNewEnvironmentUpdate(data: any) {
    this.server.emit('environmentData', data);
  }
}
