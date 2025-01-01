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

    async getAllAccounts() {
        let sql = "SELECT * FROM accounts";
        sql += " ORDER BY account_name ASC";
        try {
            const res = await this.databaseConnector.query(sql, null);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async addAccount(account) {
        const sql = "INSERT INTO accounts (account_name, balance) VALUES (?, ?)";
        try {
            return await this.databaseConnector.query(sql, [account.name, account.balance]);
        } catch (error) {
            throw error;
        }
    }

    async deleteAccountById(id) {
        const sql = "DELETE FROM accounts WHERE account_id = ?";
        try {
            return await this.databaseConnector.query(sql, [id]);
        } catch (error) {
            throw error;
        }
    }

    async getAllTransactionsFromAccount(accountId) {
        let sql = `
                SELECT 
                    t.id AS transaction_id,
                    a.account_name AS account_name,
                    c.name AS category_name,
                    t.trans_date AS transaction_date,
                    t.type AS transaction_type,
                    t.amount AS transaction_amount,
                    t.description AS transaction_description
                FROM 
                    transactions t
                JOIN 
                    accounts a ON t.account_id = a.account_id
                JOIN 
                    transCategories c ON t.transCategory_id = c.id
                WHERE 
                    t.account_id = ?
                ORDER BY 
                    t.trans_date DESC;
            `;
        try {
            const res = await this.databaseConnector.query(sql, [accountId]);
            return res.data;
        } catch (error) {
            throw error;
        }

        /*
        let sql = "SELECT * FROM transactions WHERE account_id = ?";
        sql += "ORDER BY trans_date DESC";
        try {
            const res = await this.databaseConnector.query(sql, [accountId]);
            return res.data;
        } catch (error) {
            throw error;
        }

        */
    }

    async getTransactionById(transId) {
        const sql = "SELECT * FROM transactions WHERE id = ?";
        try {
            const res = await this.databaseConnector.query(sql, [transId]);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async addTransaction(transaction) {
        const sql =
            "INSERT INTO transactions (account_id, transCategory_id, trans_date, type, amount, description) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            return await this.databaseConnector.query(sql, [
                transaction.account_id,
                transaction.transCategory_id,
                transaction.trans_date,
                transaction.type,
                transaction.amount,
                transaction.description,
            ]);
        } catch (error) {
            throw error;
        }
    }

    async updateTransactionById(transId, transaction) {
        const data = [
            transaction.account_id,
            transaction.transCategory_id,
            transaction.trans_date,
            transaction.type,
            transaction.amount,
            transaction.description,
            transId,
        ];

        const sql =
            "UPDATE transactions SET account_id = ?, transCategory_id = ?, trans_date = ?, type = ?, amount = ?, description = ? WHERE id = ?";
        try {
            return await this.databaseConnector.query(sql, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteTransactionById(transId) {
        const sql = "DELETE FROM transactions WHERE id = ?";
        try {
            return await this.databaseConnector.query(sql, [transId]);
        } catch (error) {
            throw error;
        }
    }

    async getAllTransactionTypeIncomeFromAccount(accountId) {
        let sql = "SELECT * FROM transactions WHERE account_id = ? AND type = 'Einnahme'";
        sql += "ORDER BY trans_date DESC";
        try {
            const res = await this.databaseConnector.query(sql, accountId);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllTransactionTypeExpenseFromAccount(accountId) {
        let sql = "SELECT * FROM transactions WHERE account_id = ? AND type = 'Ausgabe'";
        sql += "ORDER BY trans_date DESC";
        try {
            const res = await this.databaseConnector.query(sql, accountId);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}
export default FinanceHelper;
