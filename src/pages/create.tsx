import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter  } from '~/server/api/root';
import { PrismaClient } from '@prisma/client'; // Replace with your ORM/driver

const prisma = new PrismaClient(); // Initialize Prisma client (or your ORM)

