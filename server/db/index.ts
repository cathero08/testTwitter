import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export { prisma };

// 設置一個 PrismaClient 實例，以便您的應用程序可以使用 Prisma 與數據庫進行交互。當您需要在其他模組中執行數據庫操作時，只需導入 prisma 實例並使用它來執行相關的 Prisma 查詢和操作
