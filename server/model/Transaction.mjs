class Transaction {
    constructor(account_id, transCategory_id, trans_date, type, amount, description) {
        this.account_id = account_id;
        this.transCategory_id = transCategory_id;
        this.trans_date = trans_date;
        this.type = type;
        this.amount = amount;
        this.description = description;
    }
}
export default Transaction;
