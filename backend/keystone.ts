import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-regraph';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // How long to say signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
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
  }),
  ui: {
    // TODO: Change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add sessions value
});
