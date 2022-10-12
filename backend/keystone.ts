import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';

import { User } from './schemas/User';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-regraph';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // How long to say signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add roles - This will be the Admin
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseUrl,
      // TODO: Add data seeding here
    },
    lists: createSchema({
      // Schema items
      User,
    }),
    ui: {
      // Show the UI only for people who pass the test
      isAccessAllowed: ({ session }) => {
        console.log('Session data:');
        console.log(session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name',
    }),
  })
);
