import Database, { Statement } from 'better-sqlite3';
import { cache } from 'react';

const db = new Database('data/database.db');

export const getRoundsForTournamentQuery = db.prepare(`
    SELECT  number
    FROM    round
    WHERE   tournament_id = ?
    ORDER BY number
`);

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
                    AND tournament_id = tournament.id
            ) as heard,
            (
                SELECT  AVG(buzz_position)
                FROM    buzz
                JOIN    game ON game_id = game.id
                JOIN    round ON round_id = round.id
                WHERE   tossup_id = tossup.id
                    AND tournament_id = tournament.id
                    AND buzz.value > 0
            ) as average_buzz
    FROM    tossup
    JOIN    packet ON tossup.packet_id = packet.id
    JOIN    question_set ON packet.question_set_id = question_set.id
    JOIN    tournament ON question_set.id = tournament.question_set_id
    JOIN    round ON tournament.id = round.tournament_id
        AND round.packet_id = packet.id
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
            tossup.question,
            tossup.answer,
            tossup.slug,
            tossup.category_full AS category,
            COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS heard,
            ROUND(CAST(SUM(IIF(buzz.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)), 3) AS conversion_rate,
            ROUND(CAST(SUM(IIF(buzz.value > 10, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)), 3) AS power_rate,
            ROUND(CAST(SUM(IIF(buzz.value < 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)), 3) AS neg_rate,
            MIN(IIF(buzz.value > 0, buzz.buzz_position, NULL)) AS first_buzz,
            AVG(IIF(buzz.value > 0, buzz.buzz_position, NULL)) AS average_buzz
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
    SELECT  case when tossup.subcategory is not null then tossup.category || ' - ' || tossup.subcategory else tossup.category end AS category,
            COUNT(DISTINCT IIF(question_number <= tossups_read, game.id, null)) AS heard,
            ROUND(CAST(SUM(IIF(buzz.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id || '-' || tossup.id, null)), 3) AS conversion_rate,
            ROUND(CAST(SUM(IIF(buzz.value > 10, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id || '-' || tossup.id, null)), 3) AS power_rate,
            ROUND(CAST(SUM(IIF(buzz.value < 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT IIF(question_number <= tossups_read, game.id || '-' || tossup.id, null)), 3) AS neg_rate,
            MIN(IIF(buzz.value > 0, buzz.buzz_position, NULL)) AS first_buzz,
            AVG(IIF(buzz.value > 0, buzz.buzz_position, NULL)) AS average_buzz
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
ROUND(CAST(SUM(IIF(easy_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id), 3) AS easy_conversion,
ROUND(CAST(SUM(IIF(medium_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id), 3) AS medium_conversion,
ROUND(CAST(SUM(IIF(hard_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id), 3) AS hard_conversion
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
SELECT  case when bonus.subcategory is not null then bonus.category || ' - ' || bonus.subcategory else bonus.category end AS category,
        COUNT(DISTINCT easy_part_direct.id) AS heard,
        CAST(SUM(easy_part_direct.value + medium_part_direct.value + hard_part_direct.value) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id) AS ppb,
        ROUND(CAST(SUM(IIF(easy_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id), 3) AS easy_conversion,
        ROUND(CAST(SUM(IIF(medium_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id), 3) AS medium_conversion,
        ROUND(CAST(SUM(IIF(hard_part_direct.value > 0, 1, 0)) AS FLOAT) / COUNT(DISTINCT easy_part_direct.id), 3) AS hard_conversion
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

export const getPlayerLeaderboard = db.prepare(`
WITH raw_buzzes AS (
    SELECT 	DISTINCT tossup_id,
            buzz_position
    FROM 	tossup
    JOIN	game ON game_id = game.id
    JOIN	round ON round_id = round.id
    JOIN	buzz ON tossup_id = tossup.id
    WHERE	exclude_from_individual = 0
        AND tournament_id = 1
        AND value > 0
    ), buzz_ranks AS (
        SELECT	tossup_id,
                buzz_position,
                (SELECT COUNT()+1 FROM (
                    SELECT buzz_position FROM raw_buzzes b2 WHERE b2.buzz_position < b1.buzz_position AND b1.tossup_id = b2.tossup_id
                )) as row_num
        FROM	raw_buzzes b1
    )
    SELECT	buzz.player_id,
            player.name,
            sum(iif(buzz.value > 10, 1, 0)) as powers,
            sum(iif(buzz.value = 10, 1, 0)) as gets,
            sum(iif(buzz.value < 0, 1, 0)) as negs,
            sum(iif(buzz.value > 10, 15, iif(buzz.value = 10, 10, iif(buzz.value < 0, -5, 0)))) as points,
            min(iif(buzz.value > 0, buzz.buzz_position, NULL)) earliest_buzz,
            avg(iif(buzz.value > 0, buzz.buzz_position, NULL)) average_buzz,
            sum(iif(first.tossup_id is not null, 1, 0)) as first_buzzes,
            sum(iif(top_three.tossup_id is not null, 1, 0)) as top_three_buzzes,
            sum(iif(neg.tossup_id is not null, 1, 0)) bouncebacks
    FROM	tournament
    JOIN	round ON tournament_id = tournament.id
    JOIN	game ON round_id = round.id
    JOIN	buzz ON buzz.game_id = game.id
    JOIN	player ON buzz.player_id = player.id
    LEFT JOIN	buzz_ranks first ON buzz.tossup_id = first.tossup_id AND buzz.buzz_position = first.buzz_position AND first.row_num = 1 AND buzz.value > 0
    LEFT JOIN   buzz_ranks top_three ON buzz.tossup_id = top_three.tossup_id AND buzz.buzz_position = top_three.buzz_position AND top_three.row_num < 3 AND buzz.value > 0
    LEFT JOIN	buzz neg ON buzz.game_id = neg.game_id AND buzz.tossup_id = neg.tossup_id AND buzz.value > 0 AND neg.value < 0
    WHERE	tournament_id = ?
        AND	exclude_from_individual = 0
    group by buzz.player_id, player.name
`)

export const get = cache(function get<T>(statement:Statement, ...params:any[]) {
    return statement.get(...params) as T;
});

export const all = cache(function all<T>(statement:Statement, ...params:any[]) {
    return statement.all(...params) as T;
});