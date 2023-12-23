export type Tournament = {
    id: number;
    name: string;
    slug: string;
    question_set_edition_id: number;
    question_set_id: number;
    question_set: QuestionSet;
    location: string;
    level: string;
    start_date: Date;
    end_date: Date | null | undefined;
}

export type QuestionSet = {
    id: number;
    name: string;
    slug: string;
    difficulty: string;
    edition: string;
    edition_count: number;
}

export type Question = {
    id: number;
    set_slug: string;
    tournament_slug: string;
    round: number;
    question_number: number;
    metadata: string;
    author: string;
    editor: string;
    category: string;
    subcategory: string;
    subsubcategory: string;
    slug: string;
}

export type TossupConversion = {
    name: string;
    heard: number;
    conversion_rate: number;
    power_rate: number;
    neg_rate: number;
    first_buzz: number;
    average_buzz: number;
}

export type Tossup = Question & {
    question: string;
    answer: string;
    answer_primary: string;
} & TossupConversion

export type BonusConversion = {
    heard: number;
    ppb: number;
    easy_conversion: number;
    medium_conversion: number;
    hard_conversion: number;
}

export type Bonus = Question & {
    easy_part: string;
    easy_part_sanitized: string;
    medium_part: string;
    medium_part_sanitized: string;
    hard_part: string;
    hard_part_sanitized: string;
    easy_part_number: string;
    medium_part_number: string;
    hard_part_number: string;
} & BonusConversion

export type TossupCategory = {
    category: string;
    heard: number;
    conversion_rate: number;
    power_rate: number;
    neg_rate: number;
    average_buzz: number;
}

export type BonusCategory = {
    name: string;
    category: string;
} & BonusConversion

export type Buzz = {
    id: number;
    player_id: number;
    player_name: string;
    player_slug: string;
    team_name: string;
    team_slug: string;
    opponent_name: string;
    opponent_slug: string;
    game_id: number;
    tossup_id: number;
    buzz_position: number;
    value: number;
}

export type BonusDirect = {
    team_name: string;
    team_slug: string;
    opponent_name: string;
    opponent_slug: string;
    part_one: number;
    part_two: number;
    part_three: number;
    total: number;
}

export type BonusPart = {
    id: number;
    leadin: string;
    part: string;
    answer: string;
    metadata: string;
    value: number;
    difficulty_modifier: number;
}

export type BuzzDictionary = {
    [buzz_position:number]: number[]
}

export type Word = {
    text: string;
    emphasis?: boolean;
    bold?: boolean;
    pgText?: string;
    keywords?: Word[];
}

export type Round = {
    number: number;
}

export type Player = {
    id: number;
    name: string;
    slug: string;
    tournament_id: number;
    team_id: number;
}

export type Team = {
    id: number;
    name: string;
    slug: string;
    tournament_id: number;
}

export type TossupSummary = {
    tournament_id: number;
    tournament_name: string;
    tournament_slug: string;
    edition: string;
    round_number: number;
    question_number: number;
    tuh: number;
    conversation_rate: number;
    power_rate: number;
    neg_rate: number;
    average_buzz: number;
}

export type BonusSummary = {
    tournament_id: number;
    tournament_name: string;
    tournament_slug: string;
    edition: string;
    round_number: number;
    question_number: number;
} & BonusConversion;