DELIMITER //

CREATE TRIGGER after_insert_transaction
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    DECLARE new_balance DECIMAL(10, 2);

    IF NEW.type = 'Einnahme' THEN
        UPDATE accounts
        SET balance = balance + NEW.amount,
            last_updated = CURRENT_TIMESTAMP
        WHERE account_id = NEW.account_id;
    ELSEIF NEW.type = 'Ausgabe' THEN
        UPDATE accounts
        SET balance = balance - NEW.amount,
            last_updated = CURRENT_TIMESTAMP
        WHERE account_id = NEW.account_id;
    END IF;

    SELECT balance INTO new_balance
    FROM accounts
    WHERE account_id = NEW.account_id;

    INSERT INTO balance_history (account_id, change_amount, balance_after_change)
    VALUES (NEW.account_id, NEW.amount, new_balance);
END;
//

DELIMITER ;