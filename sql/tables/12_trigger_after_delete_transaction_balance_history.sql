DELIMITER //

CREATE TRIGGER after_delete_transaction
AFTER DELETE ON transactions
FOR EACH ROW
BEGIN
    DECLARE old_amount DECIMAL(10, 2);
    
    IF OLD.type = 'Einnahme' THEN
        SET old_amount = OLD.amount;
        UPDATE accounts
        SET balance = balance - old_amount,
            last_updated = CURRENT_TIMESTAMP
        WHERE account_id = OLD.account_id;
    ELSEIF OLD.type = 'Ausgabe' THEN
        SET old_amount = OLD.amount;
        UPDATE accounts
        SET balance = balance + old_amount,
            last_updated = CURRENT_TIMESTAMP
        WHERE account_id = OLD.account_id;
    END IF;
    
    INSERT INTO balance_history (account_id, change_amount, balance_after_change)
    VALUES (OLD.account_id, -old_amount, (SELECT balance FROM accounts WHERE account_id = OLD.account_id));
END;
//

DELIMITER ;