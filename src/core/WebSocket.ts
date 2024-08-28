import { Server } from 'socket.io';
import http from 'http';
import WhatsAppTools from './WhatsAppTools';

export const setWebSocket = (server: http.Server) => {

    const io = new Server(server);

    io.on('connection', async (socket) => {

        console.log('Client connected:', socket.id);

        const whatsAppTools = new WhatsAppTools();

        await whatsAppTools.run();
        
        socket.on('disconnect', async () => {

            await whatsAppTools.stop();

            console.log('Client disconnected:', socket.id);
        });

    });

    return io;
};