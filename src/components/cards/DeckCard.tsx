"use client";

import { DeckCard as DeckCardType, Card } from "@/types";
import { useState } from "react";
import CardItem from "@/components/deck/CardItem";

interface DeckCardProps {
  deckCards: DeckCardType[];
  onAddCard: (cardType: "neutral" | "monster" | "forbidden") => void;
  onCardAction: (cardId: string, action: string, increment?: boolean) => void;
}

export default function DeckCard({
  deckCards,
  onAddCard,
  onCardAction,
}: DeckCardProps) {
  const [newCardName, setNewCardName] = useState("");
  const [newCardType, setNewCardType] = useState<
    "neutral" | "monster" | "forbidden"
  >("neutral");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCard = () => {
    if (newCardName.trim()) {
      onAddCard(newCardType);
      setNewCardName("");
      setShowAddForm(false);
    }
  };

  const neutralCards = deckCards.filter((card) => card.type === "neutral");
  const monsterCards = deckCards.filter((card) => card.type === "monster");
  const forbiddenCards = deckCards.filter((card) => card.type === "forbidden");

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Deck Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          {showAddForm ? "Cancel" : "+ Add Card"}
        </button>
      </div>

      {/* Add Card Form */}
      {showAddForm && (
        <div className="mb-4 rounded-md border border-gray-600 bg-gray-700 p-4">
          <h3 className="mb-3 font-semibold text-white">Add New Card</h3>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Card Name
              </label>
              <input
                type="text"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
                placeholder="Enter card name"
                className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Card Type
              </label>
              <select
                title ="Card Type"
                value={newCardType}
                onChange={(e) =>
                  setNewCardType(
                    e.target.value as "neutral" | "monster" | "forbidden"
                  )
                }
                className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="neutral">Neutral Card (+20 points)</option>
                <option value="monster">Monster Card (+80 points)</option>
                <option value="forbidden">Forbidden Card (+20 points)</option>
              </select>
            </div>
            <button
              onClick={handleAddCard}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add to Deck
            </button>
          </div>
        </div>
      )}

      {/* Deck Cards Display */}
      <div className="space-y-4">
        {/* Neutral Cards */}
        {neutralCards.length > 0 && (
          <div className="rounded-md border border-blue-600 bg-gray-750 p-3">
            <h3 className="mb-2 font-semibold text-blue-400">
              Neutral Cards ({neutralCards.length})
            </h3>
            <div className="space-y-2">
              {neutralCards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  onAction={onCardAction}
                  showRemove={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Monster Cards */}
        {monsterCards.length > 0 && (
          <div className="rounded-md border border-red-600 bg-gray-750 p-3">
            <h3 className="mb-2 font-semibold text-red-400">
              Monster Cards ({monsterCards.length})
            </h3>
            <div className="space-y-2">
              {monsterCards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  onAction={onCardAction}
                  showRemove={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Forbidden Cards */}
        {forbiddenCards.length > 0 && (
          <div className="rounded-md border border-orange-600 bg-gray-750 p-3">
            <h3 className="mb-2 font-semibold text-orange-400">
              Forbidden Cards ({forbiddenCards.length})
            </h3>
            <div className="space-y-2">
              {forbiddenCards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  onAction={onCardAction}
                  showRemove={true}
                />
              ))}
            </div>
          </div>
        )}

        {deckCards.length === 0 && (
          <div className="rounded-md border border-gray-600 bg-gray-700 p-8 text-center">
            <p className="text-gray-400">
              No cards in deck. Click &quot;+ Add Card&quot; to add cards to
              your deck.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <p>
          <strong>Note:</strong> Neutral and Monster cards can have Epiphany,
          Divine Epiphany, Copy, Convert, and Remove actions.
        </p>
        <p>
          <strong>Forbidden cards</strong> can only be kept or removed (no other
          actions).
        </p>
      </div>
    </div>
  );
}
