import { Card, CardActionCost, PointBreakdown } from '@/types';
import { POINT_RULES } from '@/lib/constants/points';

/**
 * Calculate points for a single card based on its actions
 */
export function calculateCardPoints(card: Card): number {
  let points = 0;

  // Base card cost
  if (card.rarity === 'common') {
    points += POINT_RULES.commonCard;
  } else if (card.type === 'monster') {
    points += POINT_RULES.monsterCard;
  } else if (card.rarity === 'forbidden') {
    points += POINT_RULES.forbiddenCard;
  }

  // Calculate action costs
  const epiphanyCount = card.actions.filter(
    (a) => a.action === 'epiphany'
  ).length;
  const divineEpiphanyCount = card.actions.filter(
    (a) => a.action === 'divine_epiphany'
  ).length;
  const copyCount = card.actions.filter((a) => a.action === 'copy').length;
  const removeCount = card.actions.filter((a) => a.action === 'remove').length;
  const convertCount = card.actions.filter(
    (a) => a.action === 'convert'
  ).length;

  // Epiphany costs
  if (card.rarity === 'starting' || card.rarity === 'unique') {
    points += epiphanyCount * POINT_RULES.startingUniqueEpiphany;
  } else {
    points += epiphanyCount * POINT_RULES.neutralMonsterEpiphany;
  }

  // Divine Epiphany costs
  points += divineEpiphanyCount * POINT_RULES.divineEpiphany;

  // Copy costs (progressive)
  if (copyCount > 0) {
    for (let i = 1; i <= copyCount; i++) {
      points += POINT_RULES.copySubsequent(i);
    }
  }

  // Removal costs (progressive)
  if (removeCount > 0) {
    const isStartingOrEpiphany =
      card.rarity === 'starting' ||
      card.rarity === 'unique' ||
      epiphanyCount > 0 ||
      divineEpiphanyCount > 0;

    for (let i = 1; i <= removeCount; i++) {
      if (i === 1) {
        points += POINT_RULES.removeFirst;
      } else {
        points += POINT_RULES.removeSubsequent(isStartingOrEpiphany);
      }
    }
  }

  // Conversion costs
  points += convertCount * POINT_RULES.convert;

  return points;
}

/**
 * Calculate total points and breakdown for all cards
 */
export function calculateTotalPoints(cards: Card[]): PointBreakdown {
  let characterCards = 0;
  let deckCards = 0;
  let epiphanies = 0;
  let divineEpiphanies = 0;
  let copies = 0;
  let conversions = 0;
  let removals = 0;
  let forbidden = 0;

  cards.forEach((card) => {
    const cardPoints = calculateCardPoints(card);

    // Categorize points
    if (card.type === 'basic' || card.type === 'unique') {
      characterCards += cardPoints;
    } else if (card.type === 'forbidden') {
      forbidden += POINT_RULES.forbiddenCard;
    } else {
      deckCards += cardPoints;
    }

    // Action-specific tracking
    card.actions.forEach((action) => {
      if (action.action === 'epiphany') {
        epiphanies +=
          card.rarity === 'starting' || card.rarity === 'unique'
            ? POINT_RULES.startingUniqueEpiphany
            : POINT_RULES.neutralMonsterEpiphany;
      } else if (action.action === 'divine_epiphany') {
        divineEpiphanies += POINT_RULES.divineEpiphany;
      } else if (action.action === 'copy') {
        copies += POINT_RULES.copySubsequent(action.count);
      } else if (action.action === 'convert') {
        conversions += POINT_RULES.convert;
      } else if (action.action === 'remove') {
        const isStartingOrEpiphany =
          card.rarity === 'starting' ||
          card.rarity === 'unique' ||
          card.actions.some(
            (a) => a.action === 'epiphany' || a.action === 'divine_epiphany'
          );
        removals +=
          action.count === 1
            ? POINT_RULES.removeFirst
            : POINT_RULES.removeSubsequent(isStartingOrEpiphany);
      }
    });
  });

  const total =
    characterCards +
    deckCards +
    epiphanies +
    divineEpiphanies +
    copies +
    conversions +
    removals +
    forbidden;

  return {
    characterCards,
    deckCards,
    epiphanies,
    divineEpiphanies,
    copies,
    conversions,
    removals,
    forbidden,
    total,
  };
}

/**
 * Check if current points exceed the tier limit
 */
export function isOverLimit(currentPoints: number, maxPoints: number): boolean {
  return currentPoints > maxPoints;
}

/**
 * Get remaining points before hitting the limit
 */
export function getRemainingPoints(
  currentPoints: number,
  maxPoints: number
): number {
  return Math.max(0, maxPoints - currentPoints);
}