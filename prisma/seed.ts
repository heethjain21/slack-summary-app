import { PrismaClient, Frequency, SummaryType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create an organization
  const org = await prisma.org.create({
    data: {
      slack_id: "T0267BT3SK1",
    },
  });

  // Create a user associated with the organization
  const user = await prisma.user.create({
    data: {
      slack_id: "U0270NZ9KED",
      timezone: "Asia/Kolkata",
      org_id: org.id,
      summary_time: 9, // run summary at 9 hours acc to the user's timezone
    },
  });

  // Create summaries for the user in specific channels
  const summary1 = await prisma.summary.create({
    data: {
      channel_id: "C026U9N67EY",
      frequency: Frequency.DAILY,
      type: SummaryType.BRIEF,
      user_id: user.id,
      org_id: org.id,
    },
  });

  const summary2 = await prisma.summary.create({
    data: {
      channel_id: "C026N3MJU3C",
      frequency: Frequency.DAILY,
      type: SummaryType.BRIEF,
      user_id: user.id,
      org_id: org.id,
    },
  });

  console.log({ org, user, summary1, summary2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
