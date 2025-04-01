import cron from 'node-cron';
import prisma from '../../prisma.js';

const clearSecurityCodes = () => {
    const job = cron.schedule('* * * * *', async () => {
        const currDate = new Date();
        const deleted_records = await prisma.usersecuritycode.deleteMany({
            where: {
                created_at: { lte: currDate }
            }
        });

        console.log(`Security Codes cleanup: Deleted ${deleted_records.count} records at ${new Date().toISOString()}`);
    });
    job.start();
    return job;
}

export { clearSecurityCodes }
