import { prismaClient } from './prisma/client';

const prisma = new prismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export default prisma;