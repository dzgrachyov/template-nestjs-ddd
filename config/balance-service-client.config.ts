import { ClientProvider, Transport } from "@nestjs/microservices";

export default async (...args: any[]): Promise<ClientProvider> => ({
  transport: Transport.TCP,
  options: {
    port: parseInt(process.env.PORT_BALANCE_SERVICE, 10) || 3001,
  },
});