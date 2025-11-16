/**
 * Core type definitions for the game save data calculator
 */

export type CardType = 'basic' | 'unique' | 'neutral' | 'monster' | 'forbidden';

export type CardRarity = 'common' | 'starting' | 'unique' | 'divine' | 'forbidden';

export type CardAction =
  | 'epiphany'
  | 'divine_epiphany'
  | 'copy'
  | 'convert'
  | 'remove';

export interface CardActionCost {
  action: CardAction;
  count: number;
  baseCost?: number;
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: CardRarity;
  isLastUnique?: boolean; // Last unique card has limited actions
  allowedActions: CardAction[];
  actions: CardActionCost[]; // Track actions performed on this card
}

export interface CharacterCard extends Card {
  characterId: string;
  isBasic: boolean;
}

export interface Character {
  id: string;
  name: string;
  basicCards: CharacterCard[]; // 3 basic cards
  uniqueCards: CharacterCard[]; // 5 unique cards
}

export interface DeckCard extends Card {
  addedToRunCount: number; // Track if added during run
}

export interface SaveDataTier {
  level: number;
  maxPoints: number; // 30 + 10(x-1) where x is tier level
}

export interface GameState {
  tier: SaveDataTier;
  selectedCharacter: Character | null;
  characterCards: CharacterCard[];
  deckCards: DeckCard[];
  totalPoints: number;
  breakdown: PointBreakdown;
}

export interface PointBreakdown {
  characterCards: number;
  deckCards: number;
  epiphanies: number;
  divineEpiphanies: number;
  copies: number;
  conversions: number;
  removals: number;
  forbidden: number;
  total: number;
}

export interface PointCalculationRules {
  commonCard: number; // +20
  monsterCard: number; // +80
  startingUniqueEpiphany: number; // +0
  neutralMonsterEpiphany: number; // +10
  divineEpiphany: number; // +20
  copyFirst: number; // +0
  copySubsequent: (count: number) => number; // +10/30/50/70
  removeFirst: number; // +0
  removeSubsequent: (isStartingOrEpiphany: boolean) => number; // +10/30/50/70 or +20
  convert: number; // +10
  forbiddenCard: number; // +20
}