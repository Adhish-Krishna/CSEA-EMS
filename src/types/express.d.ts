import { UserPayload } from "../middleware/types.js";

declare global{
    namespace Express{
        interface Request{
            user_id?: string
        }
    }
}
