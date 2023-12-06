DELIMITER $$

CREATE TRIGGER increase_recommendation_count
AFTER INSERT ON Comments
FOR EACH ROW
BEGIN
    IF NEW.Rating >= 4 THEN
        UPDATE GameInfo
        SET RecommendationCount = RecommendationCount + 1
        WHERE QueryID = NEW.QueryID;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER decrease_recommendation_count
AFTER DELETE ON Comments
FOR EACH ROW
BEGIN
    IF OLD.Rating >= 4 THEN
        UPDATE GameInfo
        SET RecommendationCount = RecommendationCount - 1
        WHERE QueryID = OLD.QueryID;
    END IF;
END$$

DELIMITER ;
