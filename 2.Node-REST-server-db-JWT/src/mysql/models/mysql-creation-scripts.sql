DROP DATABASE IF EXISTS DiceGameDB;

CREATE DATABASE DiceGameDB;

USE DiceGameDB;

CREATE TABLE players (
    player_id INT NOT NULL AUTO_INCREMENT,
    player_name VARCHAR(50) NOT NULL COLLATE utf8_bin,
    creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name_updated_datetime TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (player_id),
    UNIQUE (player_name)
);

CREATE TABLE winrates (
    player_id INT NOT NULL,
    winrate FLOAT(5, 2) NULL,
    PRIMARY KEY (player_id),
    FOREIGN KEY (player_id) REFERENCES players (player_id)
);

CREATE TABLE games (
    game_id INT NOT NULL AUTO_INCREMENT,
    player_id INT NOT NULL,
    roll_sum TINYINT NOT NULL,
    win BOOLEAN,
    game_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id),
    FOREIGN KEY (player_id) REFERENCES players (player_id)
);

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `DiceGameDB`.`players_AFTER_INSERT` AFTER INSERT ON `players` FOR EACH ROW
BEGIN
	INSERT INTO
		winrates (player_id)
	VALUES
		(NEW.player_id);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DiceGameDB.calculate_winrates ()
BEGIN

    UPDATE 
        DiceGameDB.winrates AS wr,
        (
        SELECT 
            p.player_id,
            ROUND(
                SUM(
                    CASE 
                        WHEN g.roll_sum = 7 THEN 1
                        ELSE 0 
                    END
                ) * 100 / COUNT(g.game_id)
            , 2) AS win_rate
        FROM
            DiceGameDB.players AS p
        JOIN
            DiceGameDB.games AS g
        ON
            p.player_id = g.player_id
        GROUP BY
            p.player_id
        ) AS sp
    SET
        wr.winrate = sp.win_rate
    WHERE
        wr.player_id = sp.player_id;

    SELECT 
        p.player_id, p.player_name, wr.winrate
    FROM
        DiceGameDB.players AS p
    JOIN
        DiceGameDB.winrates AS wr
    ON
        p.player_id = wr.player_id
    WHERE
        wr.winrate IS NOT NULL
    ORDER BY
        wr.winrate DESC;
END$$

DELIMITER ;


DELIMITER $$
CREATE PROCEDURE DiceGameDB.delete_games_from_player_set_winrate_null (
    IN pl_id INT
)

BEGIN

    UPDATE 
        DiceGameDB.winrates AS wr
    SET
        wr.winrate = NULL
    WHERE
        wr.player_id = pl_id;

    DELETE FROM
        DiceGameDB.games
    WHERE
        player_id = pl_id;

END$$

DELIMITER ;
