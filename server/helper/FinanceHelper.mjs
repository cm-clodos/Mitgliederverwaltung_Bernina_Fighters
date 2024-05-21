import DatabaseConnection from "../model/DatabaseConnection.mjs";

class FinanceHelper {
    databaseConnector = null;

    constructor(databaseType = process.env.DB_TYPE || "production") {
        this.databaseConnector = new DatabaseConnection(databaseType);
    }

    async getAllTransCategories() {
        let sql = "SELECT * FROM transCategories";
        sql += " ORDER BY name ASC";
        try {
            const res = await this.databaseConnector.query(sql, null);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async addTransCategory(transCategory) {
        const sql = "INSERT INTO transCategories (name) VALUES (?)";
        try {
            return await this.databaseConnector.query(sql, [transCategory.name]);
        } catch (error) {
            throw error;
        }
    }

    async deleteTransCategory(id) {
        const sql = "DELETE FROM transCategories WHERE id = ?";
        try {
            return await this.databaseConnector.query(sql, [id]);
        } catch (error) {
            throw error;
        }
    }
}
export default FinanceHelper;
