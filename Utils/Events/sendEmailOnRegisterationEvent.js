import { EventEmitter } from "events";
import sendEmail from "../Email/sendEmail.js";

const userEvents = new EventEmitter();
userEvents.on("register", async (user) => {
  try {
    await sendEmail(user);
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error("Error in background email task:", error);
  }
});

export default userEvents;
