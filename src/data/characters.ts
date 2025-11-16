import { Character, CharacterCard } from '@/types';

/**
 * Sample character data
 * Each character has 3 basic cards and 5 unique cards
 */

const createBasicCard = (
  id: string,
  name: string,
  characterId: string
): CharacterCard => ({
  id,
  name,
  type: 'basic',
  rarity: 'common',
  characterId,
  isBasic: true,
  allowedActions: ['convert', 'remove'],
  actions: [],
});

const createUniqueCard = (
  id: string,
  name: string,
  characterId: string,
  isLast: boolean = false
): CharacterCard => ({
  id,
  name,
  type: 'unique',
  rarity: 'unique',
  characterId,
  isBasic: false,
  isLastUnique: isLast,
  allowedActions: isLast
    ? ['copy', 'convert', 'remove']
    : ['epiphany', 'divine_epiphany', 'copy', 'convert', 'remove'],
  actions: [],
});

export const CHARACTERS: Character[] = [
  {
    id: 'zagreus',
    name: 'Zagreus',
    basicCards: [
      createBasicCard('zagreus-basic-1', 'Zagreus Strike', 'zagreus'),
      createBasicCard('zagreus-basic-2', 'Zagreus Dash', 'zagreus'),
      createBasicCard('zagreus-basic-3', 'Zagreus Cast', 'zagreus'),
    ],
    uniqueCards: [
      createUniqueCard('zagreus-unique-1', 'Greater Reflex', 'zagreus'),
      createUniqueCard('zagreus-unique-2', 'Shadow Presence', 'zagreus'),
      createUniqueCard('zagreus-unique-3', 'Fiery Presence', 'zagreus'),
      createUniqueCard('zagreus-unique-4', 'Chthonic Vitality', 'zagreus'),
      createUniqueCard('zagreus-unique-5', 'Death Defiance', 'zagreus', true),
    ],
  },
  {
    id: 'melinoe',
    name: 'Melinoë',
    basicCards: [
      createBasicCard('melinoe-basic-1', 'Melinoë Strike', 'melinoe'),
      createBasicCard('melinoe-basic-2', 'Melinoë Sprint', 'melinoe'),
      createBasicCard('melinoe-basic-3', 'Melinoë Cast', 'melinoe'),
    ],
    uniqueCards: [
      createUniqueCard('melinoe-unique-1', 'Witch\'s Staff', 'melinoe'),
      createUniqueCard('melinoe-unique-2', 'Sister Blades', 'melinoe'),
      createUniqueCard('melinoe-unique-3', 'Moonstone Axe', 'melinoe'),
      createUniqueCard('melinoe-unique-4', 'Umbral Flames', 'melinoe'),
      createUniqueCard('melinoe-unique-5', 'Silver Wheel', 'melinoe', true),
    ],
  },
  {
    id: 'orpheus',
    name: 'Orpheus',
    basicCards: [
      createBasicCard('orpheus-basic-1', 'Orpheus Strike', 'orpheus'),
      createBasicCard('orpheus-basic-2', 'Orpheus Dash', 'orpheus'),
      createBasicCard('orpheus-basic-3', 'Orpheus Cast', 'orpheus'),
    ],
    uniqueCards: [
      createUniqueCard('orpheus-unique-1', 'Legendary Lyre', 'orpheus'),
      createUniqueCard('orpheus-unique-2', 'Harmonic Flow', 'orpheus'),
      createUniqueCard('orpheus-unique-3', 'Resonant Voice', 'orpheus'),
      createUniqueCard('orpheus-unique-4', 'Soothing Melody', 'orpheus'),
      createUniqueCard('orpheus-unique-5', 'Song of the Underworld', 'orpheus', true),
    ],
  },
];

export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((char) => char.id === id);
}

export function getAllCharacters(): Character[] {
  return CHARACTERS;
}