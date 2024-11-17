const DatabaseService = require('./db.service')

const dbService = new DatabaseService();

module.exports = class LoginService {

    async isUserExists(uid, password) {
        const users = await dbService.getUsers();
        const uidAndPasswordCorrect = (user) => (user.uid === uid) && (user.password === password);
        
        return !!users.filter(uidAndPasswordCorrect).length;
    }
}
