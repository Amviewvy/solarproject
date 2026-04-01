import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import * as net from 'net';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'https://exymc.eng.nu.ac.th'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket'],
})
export class RealtimeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RealtimeGateway.name);

  // ==================== PLC (port 9000) ====================
  private plcClient: net.Socket | null = null;
  private plcConnected = false;
  private plcReconnectTimer: NodeJS.Timeout | null = null;

  // ==================== Inverter (port 9001) ====================
  private inverterClient: net.Socket | null = null;
  private inverterConnected = false;
  private inverterReconnectTimer: NodeJS.Timeout | null = null;

  @WebSocketServer()
  server: Server;

  // ==================== Init ====================

  afterInit() {
    this.logger.log('✅ WebSocket Gateway initialized');
    this.connectToPLC();
    this.connectToInverter();
  }

  // ==================== PLC TCP ====================

  private connectToPLC() {
    if (this.plcConnected) return;
    this.logger.log('🔄 Connecting to C# PLC (port 9000)...');

    if (this.plcClient) {
      this.plcClient.destroy();
      this.plcClient = null;
    }

    this.plcClient = new net.Socket();

    this.plcClient.connect(4000, '127.0.0.1', () => {
      this.plcConnected = true;
      this.clearTimer('plc');
      this.logger.log('✅ Connected to C# PLC TCP Server');
    });

    let plcBuffer = '';
    this.plcClient.on('data', (data) => {
      plcBuffer += data.toString();
      const lines = plcBuffer.split('\n');
      plcBuffer = lines.pop() ?? '';

      for (const line of lines) {
        const msg = line.trim();
        if (!msg) continue;
        try {
          const parsed = JSON.parse(msg);
          this.server.emit('plcStatus', parsed); // → Frontend
        } catch {
          this.logger.error('PLC JSON parse error: ' + msg);
        }
      }
    });

    this.plcClient.on('error', (err) => {
      this.logger.error('PLC TCP Error: ' + err.message);
      this.plcConnected = false;
      this.scheduleReconnect('plc');
    });

    this.plcClient.on('close', () => {
      this.logger.warn('⚠️ PLC TCP connection closed');
      this.plcConnected = false;
      this.scheduleReconnect('plc');
    });
  }

  // ==================== Inverter TCP ====================

  private connectToInverter() {
    if (this.inverterConnected) return;
    this.logger.log('🔄 Connecting to C# Inverter (port 9001)...');

    if (this.inverterClient) {
      this.inverterClient.destroy();
      this.inverterClient = null;
    }

    this.inverterClient = new net.Socket();

    this.inverterClient.connect(4001, '127.0.0.1', () => {
      this.inverterConnected = true;
      this.clearTimer('inverter');
      this.logger.log('✅ Connected to C# Inverter TCP Server');
    });

    let inverterBuffer = '';
    this.inverterClient.on('data', (data) => {
      inverterBuffer += data.toString();
      const lines = inverterBuffer.split('\n');
      inverterBuffer = lines.pop() ?? '';

      for (const line of lines) {
        const msg = line.trim();
        if (!msg) continue;
        try {
          const parsed = JSON.parse(msg);
          this.server.emit('inverterData', parsed); // → Frontend
        } catch {
          this.logger.error('Inverter JSON parse error: ' + msg);
        }
      }
    });

    this.inverterClient.on('error', (err) => {
      this.logger.error('Inverter TCP Error: ' + err.message);
      this.inverterConnected = false;
      this.scheduleReconnect('inverter');
    });

    this.inverterClient.on('close', () => {
      this.logger.warn('⚠️ Inverter TCP connection closed');
      this.inverterConnected = false;
      this.scheduleReconnect('inverter');
    });
  }

  // ==================== Reconnect Helpers ====================

  private scheduleReconnect(target: 'plc' | 'inverter') {
    if (target === 'plc') {
      if (this.plcReconnectTimer) return;
      this.logger.log('⏳ PLC reconnect in 10s...');
      this.plcReconnectTimer = setTimeout(() => {
        this.plcReconnectTimer = null;
        this.connectToPLC();
      }, 10000);
    } else {
      if (this.inverterReconnectTimer) return;
      this.logger.log('⏳ Inverter reconnect in 10s...');
      this.inverterReconnectTimer = setTimeout(() => {
        this.inverterReconnectTimer = null;
        this.connectToInverter();
      }, 10000);
    }
  }

  private clearTimer(target: 'plc' | 'inverter') {
    if (target === 'plc' && this.plcReconnectTimer) {
      clearTimeout(this.plcReconnectTimer);
      this.plcReconnectTimer = null;
    } else if (target === 'inverter' && this.inverterReconnectTimer) {
      clearTimeout(this.inverterReconnectTimer);
      this.inverterReconnectTimer = null;
    }
  }

  // ==================== Frontend → PLC ====================

  @SubscribeMessage('toggleSwitch')
  handleToggle(@MessageBody() data: any) {
    // data = { coil: 8193, value: true }
    this.logger.log(`➡️ PLC Send: ${JSON.stringify(data)}`);

    if (this.plcClient && this.plcConnected) {
      this.plcClient.write(JSON.stringify(data) + '\n');
    } else {
      this.logger.warn('⚠️ PLC not connected');
    }

    this.server.emit('plcLog', {
      message: `Coil ${data.coil} → ${data.value ? 'ON' : 'OFF'}`,
      timestamp: new Date().toISOString(),
    });
  }

  // ==================== Frontend → Inverter ====================

  @SubscribeMessage('inverterCommand')
  handleInverterCommand(@MessageBody() data: any) {
    /**
     * data = { action: 'start' | 'stop' | 'read' | 'readFreqA' | 'setPower' | 'setPF', value?: number }
     * ตัวอย่าง: { action: 'setPower', value: 80 }
     */
    this.logger.log(`➡️ Inverter Send: ${JSON.stringify(data)}`);

    if (this.inverterClient && this.inverterConnected) {
      this.inverterClient.write(JSON.stringify(data) + '\n');
    } else {
      this.logger.warn('⚠️ Inverter not connected');
    }
  }

  // ==================== Socket.IO ====================

  handleConnection(client: Socket) {
    this.logger.log(`🟢 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.warn(`🔴 Client disconnected: ${client.id}`);
  }

  // ==================== Emit Helpers ====================

  emitMeasurementUpdated(deviceId: string) {
    this.server.emit('measurement.updated', {
      deviceId,
      message: 'new measurement saved',
      timestamp: new Date().toISOString(),
    });
  }

  sendNewDataUpdate(data: any) {
    this.server.emit('newData', data);
  }

  sendNewEnvironmentUpdate(data: any) {
    this.server.emit('environmentData', data);
  }
}
