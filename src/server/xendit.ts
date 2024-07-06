import { Xendit } from "xendit-node";
import { env } from "~/env";

const xenditClient = new Xendit({
  secretKey: env.XENDIT_SECRET_KEY,
});

export default xenditClient;
