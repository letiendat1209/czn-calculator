"use client";

import { Character, CharacterCard as CharacterCardType } from "@/types";
import { useState } from "react";
import CardItem from "@/components/deck/CardItem";

interface CharacterCardProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  characterCards: CharacterCardType[];
  onCardAction: (cardId: string, action: string, increment?: boolean) => void;
}

export default function CharacterCard({
  characters,
  selectedCharacter,
  onCharacterSelect,
  characterCards,
  onCardAction,
}: CharacterCardProps) {
  const [expandedSections, setExpandedSections] = useState<{
    basic: boolean;
    unique: boolean;
  }>({
    basic: true,
    unique: true,
  });

  const toggleSection = (section: "basic" | "unique") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const basicCards = characterCards.filter((card) => card.isBasic);
  const uniqueCards = characterCards.filter((card) => !card.isBasic);

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Character Selection</h2>

      {/* Character Selector */}
      <div className="mb-6">
        <label
          htmlFor="character-select"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Select Character
        </label>
        <select
          id="character-select"
          value={selectedCharacter?.id || ""}
          onChange={(e) => {
            const char = characters.find((c) => c.id === e.target.value);
            if (char) onCharacterSelect(char);
          }}
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a character --</option>
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCharacter && (
        <div className="space-y-4">
          {/* Basic Cards Section */}
          <div className="rounded-md border border-gray-600 bg-gray-750">
            <button
              onClick={() => toggleSection("basic")}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-700"
            >
              <h3 className="font-semibold text-white">
                Basic Cards ({basicCards.length})
              </h3>
              <span className="text-gray-400">
                {expandedSections.basic ? "▼" : "▶"}
              </span>
            </button>

            {expandedSections.basic && (
              <div className="space-y-2 border-t border-gray-600 p-4">
                {basicCards.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No basic cards available
                  </p>
                ) : (
                  basicCards.map((card) => (
                    <CardItem
                      key={card.id}
                      card={card}
                      onAction={onCardAction}
                    />
                  ))
                )}
                <div className="mt-2 text-xs text-gray-400">
                  <p>Basic cards can only be Converted or Removed</p>
                </div>
              </div>
            )}
          </div>

          {/* Unique Cards Section */}
          <div className="rounded-md border border-gray-600 bg-gray-750">
            <button
              onClick={() => toggleSection("unique")}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-700"
            >
              <h3 className="font-semibold text-white">
                Unique Cards ({uniqueCards.length})
              </h3>
              <span className="text-gray-400">
                {expandedSections.unique ? "▼" : "▶"}
              </span>
            </button>

            {expandedSections.unique && (
              <div className="space-y-2 border-t border-gray-600 p-4">
                {uniqueCards.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No unique cards available
                  </p>
                ) : (
                  uniqueCards.map((card, index) => (
                    <CardItem
                      key={card.id}
                      card={card}
                      onAction={onCardAction}
                      isLastUnique={index === uniqueCards.length - 1}
                    />
                  ))
                )}
                <div className="mt-2 text-xs text-gray-400">
                  <p>
                    First 4 unique cards: Full actions (Epiphany, Divine
                    Epiphany, Copy, Convert, Remove)
                  </p>
                  <p>
                    Last unique card: Limited actions (Copy, Convert, Remove
                    only)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
