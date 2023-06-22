import Database, { Statement } from 'better-sqlite3';
import { cache } from 'react';

const db = new Database('data/database.db');

export const getTossupForDetailQuery = db.prepare(`
    SELECT  tossup.id,
            tossup.packet_id,
            tossup.question_number,
            tossup.question,
            tossup.answer,
            tossup.slug,
            tossup.metadata,
            tossup.author,
            tossup.editor,
            tossup.category,
            tossup.subcategory,
            tossup.subsubcategory,
            (
                SELECT  count(game.id) 
                FROM    game
                JOIN    round ON round_id = round.id
                JOIN    packet ON round.packet_id = packet.id
                WHERE   tossup.packet_id = packet.id
                    AND tossup.question_number <= game.tossups_read
            ) as heard
    FROM    tossup
    JOIN    packet ON tossup.packet_id = packet.id
    JOIN    question_set ON packet.question_set_id = question_set.id
    JOIN    tournament ON question_set.id = tournament.question_set_id
    JOIN    round ON tournament.id = round.tournament_id
    WHERE   tournament.id = ?
        AND round.number = ?
        AND tossup.question_number = ?
`);

export const getBonusPartsQuery = db.prepare(`
    SELECT  bonus.id,
            bonus.packet_id,
            bonus.question_number,
            bonus.leadin,
            bonus_part.part,
            bonus_part.answer,
            bonus_part.difficulty_modifier,
            bonus_part.value,
            bonus.metadata,
            bonus.author,
            bonus.editor,
            bonus.category,
            bonus.subcategory,
            bonus.subsubcategory
    FROM    bonus
    JOIN    packet ON bonus.packet_id = packet.id
    JOIN    question_set ON packet.question_set_id = question_set.id
    JOIN    tournament ON question_set.id = tournament.question_set_id
    JOIN    round ON round.packet_id = packet.id
    JOIN    bonus_part on bonus.id = bonus_part.bonus_id
    WHERE   tournament.id = ?
        AND round.number = ?
        AND bonus.question_number = ?
    ORDER BY part_number
`);

export const getDirectsByBonusQuery = db.prepare(`
    SELECT  team.name AS team_name,
            team.slug AS team_slug,
            opponent.name AS opponent_name,
            opponent.slug AS opponent_slug,
            part_one_direct.value AS part_one,
            part_two_direct.value AS part_two,
            part_three_direct.value AS part_three,
            part_one_direct.value + part_two_direct.value + part_three_direct.value AS total
    FROM    bonus
    JOIN    bonus_part part_one ON bonus.id = part_one.bonus_id
        AND part_one.part_number = 1
    JOIN    bonus_part part_two ON bonus.id = part_two.bonus_id
        AND part_two.part_number = 2
    JOIN    bonus_part part_three ON bonus.id = part_three.bonus_id
        AND part_three.part_number = 3
    JOIN    bonus_part_direct part_one_direct ON part_one.id = part_one_direct.bonus_part_id
    JOIN    bonus_part_direct part_two_direct ON part_two.id = part_two_direct.bonus_part_id
        AND part_one_direct.team_id = part_two_direct.team_id
    JOIN    bonus_part_direct part_three_direct ON part_three.id = part_three_direct.bonus_part_id
        AND part_one_direct.team_id = part_three_direct.team_id 
    JOIN    team ON part_one_direct.team_id = team.id
    JOIN    game ON part_one_direct.game_id = game.id
    JOIN    team opponent ON (team.id <> team_one_id AND opponent.id = team_one_id)
    OR  (team.id <> team_two_id AND opponent.id = team_two_id)
    WHERE   bonus.id = ?
        AND team.tournament_id = ? 
`);

export const getBuzzesByTossupQuery = db.prepare(`
    SELECT  buzz.id,
            player_id,
            player.name AS player_name,
            player.slug AS player_slug,
            team.name AS team_name,
            team.slug AS team_slug,
            opponent.name AS opponent_name,
            opponent.slug AS opponent_slug,
            game_id,
            tossup_id,
            buzz_position,
            value
    FROM    buzz
    JOIN    player ON player_id = player.id
    JOIN    team ON team_id = team.id
    JOIN    game ON game_id = game.id
    JOIN    team opponent ON (team.id <> team_one_id AND opponent.id = team_one_id)
        OR  (team.id <> team_two_id AND opponent.id = team_two_id)
    WHERE   buzz.tossup_id = ?
        AND team.tournament_id = ? 
`);

export const getTournamentsQuery = db.prepare(`
    SELECT  id,
            name, 
            slug, 
            location, 
            level, 
            start_date, 
            end_date 
    FROM    tournament
    ORDER BY start_date desc`);

export const getTournamentBySlugQuery = db.prepare(`
    SELECT  id,
            name, 
            slug, 
            question_set_id,
            location, 
            level, 
            start_date, 
            end_date 
    FROM    tournament
    WHERE   slug = ?`);

export const getTossupsByTournamentQuery = db.prepare(`
    SELECT  tossup.id,
            tournament.slug AS tournament_slug,
            round.number AS round,
            tossup.question_number,
            tossup.answer,
            tossup.slug,
            tossup.category_full AS category,
            COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS heard,
            CAST(SUM(IIF(buzz.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS conversion_rate,
            CAST(SUM(IIF(buzz.value > 10, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS power_rate,
            CAST(SUM(IIF(buzz.value < 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS neg_rate,
            MIN(IIF(buzz.value > 0, buzz.buzz_position, NULL)) AS first_buzz,
            AVG(IIF(buzz.value > 0, buzz.buzz_position, NULL)) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS average_buzz
    FROM    tournament
    JOIN    round ON tournament.id = tournament_id
    JOIN    packet ON round.packet_id = packet.id
    JOIN    tossup ON tossup.packet_id = packet.id
    JOIN    game ON round.id = game.round_id
    LEFT JOIN buzz ON tossup.id = buzz.tossup_id
		AND	game.id = buzz.game_id
    WHERE   tournament.id = ?
    GROUP BY tossup.id,
             tournament.slug,
             round.number,
             tossup.question_number,
             tossup.answer,
             tossup.slug,
             tossup.category_full`);  

export const getTossupCategoryStatsQuery = db.prepare(`
    SELECT  tossup.category || ' - ' || tossup.subcategory AS category,
            COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS heard,
            CAST(SUM(IIF(buzz.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS conversion_rate,
            CAST(SUM(IIF(buzz.value > 10, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS power_rate,
            CAST(SUM(IIF(buzz.value < 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS neg_rate,
            MIN(IIF(buzz.value > 0, buzz.buzz_position, NULL)) AS first_buzz,
            AVG(IIF(buzz.value > 0, buzz.buzz_position, NULL)) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS average_buzz
    FROM    tournament
    JOIN    round ON tournament.id = tournament_id
    JOIN    packet ON round.packet_id = packet.id
    JOIN    tossup ON tossup.packet_id = packet.id
    JOIN    game ON round.id = game.round_id
    LEFT JOIN buzz ON tossup.id = buzz.tossup_id
		AND	game.id = buzz.game_id
    WHERE   tournament.id = ?
    GROUP BY tossup.category, tossup.subcategory
`);

export const getBonusesByTournamentQuery = db.prepare(`
SELECT  tournament.slug AS tournament_slug,
round.number AS round,
bonus.question_number,
bonus.category_full AS category,
easy_part.answer AS easy_part,
medium_part.answer AS medium_part,
hard_part.answer AS hard_part,
easy_part.answer_sanitized AS easy_part_sanitized,
medium_part.answer_sanitized AS medium_part_sanitized,
hard_part.answer_sanitized AS hard_part_sanitized,
easy_part.part_number AS easy_part_number,
medium_part.part_number AS medium_part_number,
hard_part.part_number AS hard_part_number,
COUNT(DISTINCT easy_part_direct.id) AS heard,
CAST(SUM(easy_part_direct.value + medium_part_direct.value + hard_part_direct.value) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS ppb,
CAST(SUM(IIF(easy_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS easy_conversion,
CAST(SUM(IIF(medium_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS medium_conversion,
CAST(SUM(IIF(hard_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS hard_conversion
FROM    tournament
JOIN    round ON tournament.id = tournament_id
JOIN    packet ON round.packet_id = packet.id
JOIN    bonus ON bonus.packet_id = packet.id
JOIN    bonus_part easy_part on bonus.id = easy_part.bonus_id
AND easy_part.difficulty_modifier = 'e'
JOIN    bonus_part medium_part on bonus.id = medium_part.bonus_id
AND medium_part.difficulty_modifier = 'm'
JOIN    bonus_part hard_part on bonus.id = hard_part.bonus_id
AND hard_part.difficulty_modifier = 'h'
JOIN    game ON round.id = game.round_id
LEFT JOIN bonus_part_direct easy_part_direct ON easy_part.id = easy_part_direct.bonus_part_id
AND	game.id = easy_part_direct.game_id
LEFT JOIN bonus_part_direct medium_part_direct ON medium_part.id = medium_part_direct.bonus_part_id
AND	game.id = medium_part_direct.game_id
LEFT JOIN bonus_part_direct hard_part_direct ON hard_part.id = hard_part_direct.bonus_part_id
AND	game.id = hard_part_direct.game_id    
WHERE   tournament.id = ?
GROUP BY tournament.slug,
 round.number,
 bonus.question_number,
 bonus.category_full,
 easy_part.answer,
 medium_part.answer,
 hard_part.answer,
 easy_part.answer_sanitized,
 medium_part.answer_sanitized,
 hard_part.answer_sanitized,
 easy_part.part_number,
 medium_part.part_number,
 hard_part.part_number`);  

export const getBonusCategoryStatsQuery = db.prepare(`
SELECT  bonus.category || ' - ' || bonus.subcategory AS category,
        COUNT(DISTINCT easy_part_direct.id) AS heard,
        CAST(SUM(easy_part_direct.value + medium_part_direct.value + hard_part_direct.value) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS ppb,
        CAST(SUM(IIF(easy_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS easy_conversion,
        CAST(SUM(IIF(medium_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS medium_conversion,
        CAST(SUM(IIF(hard_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS hard_conversion
FROM    tournament
JOIN    round ON tournament.id = tournament_id
JOIN    packet ON round.packet_id = packet.id
JOIN    bonus ON bonus.packet_id = packet.id
JOIN    bonus_part easy_part on bonus.id = easy_part.bonus_id
    AND easy_part.difficulty_modifier = 'e'
JOIN    bonus_part medium_part on bonus.id = medium_part.bonus_id
    AND medium_part.difficulty_modifier = 'm'
JOIN    bonus_part hard_part on bonus.id = hard_part.bonus_id
    AND hard_part.difficulty_modifier = 'h'
JOIN    game ON round.id = game.round_id
LEFT JOIN bonus_part_direct easy_part_direct ON easy_part.id = easy_part_direct.bonus_part_id
    AND	game.id = easy_part_direct.game_id
LEFT JOIN bonus_part_direct medium_part_direct ON medium_part.id = medium_part_direct.bonus_part_id
    AND	game.id = medium_part_direct.game_id
LEFT JOIN bonus_part_direct hard_part_direct ON hard_part.id = hard_part_direct.bonus_part_id
    AND	game.id = hard_part_direct.game_id    
WHERE   tournament.id = ?
GROUP BY bonus.category,
 bonus.subcategory
`);

export const getQuestionSetQuery = db.prepare(`
    SELECT  id,
            name,
            slug,
            difficulty
    FROM    question_set
    WHERE   id = ?
`)

export const get = cache(function get<T>(statement:Statement, ...params:any[]) {
    return statement.get(...params) as T;
});

export const all = cache(function all<T>(statement:Statement, ...params:any[]) {
    return statement.all(...params) as T;
});