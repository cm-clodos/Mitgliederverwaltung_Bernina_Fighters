import DatabaseConnection from "../model/DatabaseConnection.mjs";

class TrikotHelper {
    databaseConnector = null;

    constructor(databaseType = process.env.DB_TYPE || 'production') {
        this.databaseConnector = new DatabaseConnection(databaseType);
    }

    async getAllTrikots() {
        let sql = " SELECT m.id as memberId, m.firstname, m.lastname, t.number, t.name, t.available FROM trikots t ";
        sql += " LEFT JOIN members m ON t.member_id = m.id";
        try {
            const res = await this.databaseConnector.query(sql, null);
            return res.data;
        } catch (error){
            throw error;
        }
    }

    async getTrikotByNumber(trikotNumber) {
        const sql = "SELECT * FROM trikots WHERE number = ?";
        try {
            const res = await this.databaseConnector.query(sql, [trikotNumber]);
            return res.data;
        } catch (error){
            throw error;
        }
    }

    async addTrikot(trikot) {
        const data = [trikot.number, trikot.name, trikot.available, trikot.member_id];
        const sql = "INSERT INTO trikots (number, name, available, member_id) VALUES (?,?,?,?)";
        try {
            return await this.databaseConnector.query(sql, data);
        } catch (error){
            throw error;
        }
    }

    async deleteTrikotByNumber(trikotNumber) {
        const sql = "DELETE FROM trikots WHERE number = ?";
        try {
            return await this.databaseConnector.query(sql, [trikotNumber]);
        } catch (error){
            throw error;
        }
    }

    async updateTrikot(trikot) {
        const data = [trikot.member_id, trikot.available, trikot.name, trikot.number];
        const sql = "UPDATE trikots SET member_id=?, available=?, name=? WHERE number=?";
        try {
            return await this.databaseConnector.query(sql, data);
        } catch (error){
            throw error;
        }
    }
}
export default TrikotHelper;