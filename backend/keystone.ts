import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';

import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

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
      // Add data seed here - using npm script
      async onConnect(keystone) {
        console.log('==== DB connection stabilished ====');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items
      User,
      Product,
      ProductImage,
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
