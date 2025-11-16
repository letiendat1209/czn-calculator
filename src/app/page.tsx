"use client";

import { useState, useEffect } from "react";
import {
  Character,
  CharacterCard,
  DeckCard,
  SaveDataTier,
  Card,
  CardAction,
  GameState,
} from "@/types";
import { calculateMaxPoints } from "@/lib/constants/points";
import { calculateTotalPoints } from "@/lib/calculators/pointCalculator";
import { getAllCharacters } from "@/data/characters";
import TierCard from "@/components/cards/TierCard";
import CharacterCard from "@/components/cards/CharacterCard";
import DeckCard from "@/components/cards/DeckCard";
import PointSummary from "@/components/ui/PointSummary";

export default function Home() {

  const [tier, setTier] = useState<SaveDataTier>({
    level: 1,
    maxPoints: 30,
  });

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [characterCards, setCharacterCards] = useState<CharacterCard[]>([]);
  const [deckCards, setDeckCards] = useState<DeckCard[]>([]);
  const [characters] = useState<Character[]>(getAllCharacters());

  // Calculate points whenever cards change
  const allCards = [...characterCards, ...deckCards];
  const breakdown = calculateTotalPoints(allCards);

  const handleTierChange = (level: number) => {
    const maxPoints = calculateMaxPoints(level);
    setTier({ level, maxPoints });
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    // Load character's cards
    const cards = [...character.basicCards, ...character.uniqueCards].map(
      (card) => ({
        ...card,
        actions: [],
      })
    );
    setCharacterCards(cards);
  };

  const handleCardAction = (
    cardId: string,
    action: string,
    increment: boolean = true
  ) => {
    const updateCards = (cards: any[]) => {
      return cards
        .map((card) => {
          if (card.id === cardId) {
            if (action === "remove_from_deck") {
              // Remove card from deck
              return null;
            }

            const existingAction = card.actions.find(
              (a: any) => a.action === action
            );

            if (existingAction) {
              // Update existing action count
              const newCount = increment
                ? existingAction.count + 1
                : Math.max(0, existingAction.count - 1);

              return {
                ...card,
                actions:
                  newCount === 0
                    ? card.actions.filter((a: any) => a.action !== action)
                    : card.actions.map((a: any) =>
                        a.action === action ? { ...a, count: newCount } : a
                      ),
              };
            } else if (increment) {
              // Add new action
              return {
                ...card,
                actions: [...card.actions, { action, count: 1 }],
              };
            }
          }
          return card;
        })
        .filter((card) => card !== null);
    };

    // Update character cards
    if (characterCards.some((card) => card.id === cardId)) {
      setCharacterCards((prev) => updateCards(prev));
    }

    // Update deck cards
    if (deckCards.some((card) => card.id === cardId)) {
      if (action === "remove_from_deck") {
        setDeckCards((prev) => prev.filter((card) => card.id !== cardId));
      } else {
        setDeckCards((prev) => updateCards(prev));
      }
    }
  };

  const handleAddCard = (cardType: "neutral" | "monster" | "forbidden") => {
    const newCard: DeckCard = {
      id: `deck-${Date.now()}-${Math.random()}`,
      name: `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} Card`,
      type: cardType,
      rarity: cardType === "forbidden" ? "forbidden" : "common",
      allowedActions:
        cardType === "forbidden"
          ? ["remove"]
          : ["epiphany", "divine_epiphany", "copy", "convert", "remove"],
      actions: [],
      addedToRunCount: 0,
    };

    setDeckCards((prev) => [...prev, newCard]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">
            Game Save Data Calculator
          </h1>
          <p className="text-gray-400">
            Calculate your save data points for Faint Memories
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Controls */}
          <div className="space-y-6 lg:col-span-2">
            {/* Card 1: Tier Selection */}
            <TierCard tier={tier} onTierChange={handleTierChange} />

            {/* Card 2: Character Selection */}
            <CharacterCard
              characters={characters}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={handleCharacterSelect}
              characterCards={characterCards}
              onCardAction={handleCardAction}
            />

            {/* Card 3: Deck Management */}
            <DeckCard
              deckCards={deckCards}
              onAddCard={handleAddCard}
              onCardAction={handleCardAction}
            />
          </div>

          {/* Right Column - Point Summary */}
          <div className="lg:col-span-1">
            <PointSummary breakdown={breakdown} tier={tier} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Based on the save data system from the game. Point values and rules
            may vary.
          </p>
          <p className="mt-1">Formula: Max Points = 30 + 10(Tier - 1)</p>
        </footer>
      </div>
    </div>
  );
}
