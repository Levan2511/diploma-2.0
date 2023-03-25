const DatabaseService = require("./db.service");

const dbService = new DatabaseService();

class LoginService {

    async isUserExists(uid, password) {
        const users = await dbService.getUsers();
        const uidAndPasswordCorrect = user => (user.uid === uid) && (user.password === password);

        console.log(users, { uid, password });
        
        return !!users.filter(uidAndPasswordCorrect).length;
    }
}

module.exports = LoginService;