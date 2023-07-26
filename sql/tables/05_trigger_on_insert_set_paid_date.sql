DELIMITER //
CREATE TRIGGER set_paid_date_on_insert
    BEFORE INSERT ON payment
    FOR EACH ROW
BEGIN
    IF NEW.paid = 1 THEN
SET NEW.paid_date = CURRENT_TIMESTAMP;
    ELSE
SET NEW.paid_date = NULL;
END IF;
END //
DELIMITER ;