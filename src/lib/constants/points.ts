import { PointCalculationRules } from '@/types';

/**
 * Point calculation rules based on the game's save data system
 * Base point limit: 30 + 10(x-1) where x is the tier level
 */
export const POINT_RULES: PointCalculationRules = {
  // Card base costs
  commonCard: 20,
  monsterCard: 80,

  // Epiphany costs
  startingUniqueEpiphany: 0,
  neutralMonsterEpiphany: 10,
  divineEpiphany: 20,

  // Copy costs
  copyFirst: 0,
  copySubsequent: (count: number) => {
    // First copy: +0, then +10/30/50/70 for subsequent copies
    if (count <= 1) return 0;
    return 10 + (count - 2) * 20;
  },

  // Removal costs
  removeFirst: 0,
  removeSubsequent: (isStartingOrEpiphany: boolean) => {
    // +20 if Starting or Epiphany card
    // Otherwise +10/30/50/70 pattern
    return isStartingOrEpiphany ? 20 : 10;
  },

  // Conversion cost
  convert: 10,

  // Forbidden card cost
  forbiddenCard: 20,
};

/**
 * Calculate max points for a given tier level
 */
export function calculateMaxPoints(tierLevel: number): number {
  return 30 + 10 * (tierLevel - 1);
}

/**
 * Calculate copy cost based on copy count
 */
export function calculateCopyCost(copyCount: number): number {
  if (copyCount === 0) return 0;
  if (copyCount === 1) return POINT_RULES.copyFirst;

  let totalCost = POINT_RULES.copyFirst;
  for (let i = 2; i <= copyCount; i++) {
    totalCost += POINT_RULES.copySubsequent(i);
  }
  return totalCost;
}

/**
 * Calculate removal cost based on removal count and card type
 */
export function calculateRemovalCost(
  removalCount: number,
  isStartingOrEpiphanyCard: boolean
): number {
  if (removalCount === 0) return 0;

  let totalCost = POINT_RULES.removeFirst;

  for (let i = 2; i <= removalCount; i++) {
    totalCost += POINT_RULES.removeSubsequent(isStartingOrEpiphanyCard);
  }

  return totalCost;
}