import cron from 'node-cron';
import prisma from '../../prisma.js';

const clearSecurityCodes = () => {
    const job = cron.schedule('* * * * *', async () => {
        const twominago = new Date();
        twominago.setMinutes(twominago.getMinutes() - 2);
        const deleted_records = await prisma.usersecuritycode.deleteMany({
            where: {
                created_at: { lte: twominago }
            }
        });

        console.log(`Security Codes cleanup: Deleted ${deleted_records.count} records at ${new Date().toISOString()}`);
    });
    job.start();
    return job;
}

export { clearSecurityCodes }
