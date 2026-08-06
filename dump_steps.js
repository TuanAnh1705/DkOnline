const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();
async function main() {
  const procs = await prisma.procedure.findMany({include: {steps: true}});
  console.log(JSON.stringify(procs, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
