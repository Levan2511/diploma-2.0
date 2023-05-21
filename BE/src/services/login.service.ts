import { User } from "../models/db";
import { DatabaseService } from "./db.service";

const dbService = new DatabaseService();

export class LoginService {

    async isUserExists(uid: string, password: string) {
        const users = await dbService.getUsers();
        const uidAndPasswordCorrect = (user: User) => (user.uid === uid) && (user.password === password);
        
        return !!users.filter(uidAndPasswordCorrect).length;
    }
}
