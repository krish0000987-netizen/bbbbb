import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

async function createAdmin() {
  try {
    const username = "akshay";
    const password = "000999";
    
    console.log(`Checking for existing user: ${username}...`);
    const [existing] = await db.select().from(users).where(eq(users.username, username));
    
    if (existing) {
      console.log(`User ${username} already exists! No changes made.`);
      process.exit(0);
    }
    
    console.log(`Hashing password...`);
    const hash = await bcrypt.hash(password, 10);
    
    console.log(`Creating admin user: ${username}...`);
    // Manual ID for script
    const id = uuidv4();
    await db.insert(users).values({
      id,
      username,
      password: hash,
      role: "admin",
      isActive: true,
    });
    
    console.log(`[SUCCESS] Admin user created!`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error(`[ERROR] Failed to create admin user:`, err);
    process.exit(1);
  }
}

createAdmin();
