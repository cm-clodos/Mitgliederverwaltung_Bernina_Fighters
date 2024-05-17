DELIMITER //

CREATE TRIGGER after_update_transaction
AFTER UPDATE ON transactions
FOR EACH ROW
BEGIN
    DECLARE old_amount DECIMAL(10, 2);
    DECLARE new_amount DECIMAL(10, 2);
    
    IF OLD.type = 'Einnahme' THEN
        SET old_amount = OLD.amount;
    ELSEIF OLD.type = 'Ausgabe' THEN
        SET old_amount = -OLD.amount;
    END IF;

    IF NEW.type = 'Einnahme' THEN
        SET new_amount = NEW.amount;
    ELSEIF NEW.type = 'Ausgabe' THEN
        SET new_amount = -NEW.amount;
    END IF;

    UPDATE accounts
    SET balance = balance - old_amount + new_amount,
        last_updated = CURRENT_TIMESTAMP
    WHERE account_id = OLD.account_id;
    
    INSERT INTO balance_history (account_id, change_amount, balance_after_change)
    VALUES (OLD.account_id, new_amount - old_amount, (SELECT balance FROM accounts WHERE account_id = OLD.account_id));
END;
//

DELIMITER ;