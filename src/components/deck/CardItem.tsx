"use client";

import { Card, CardAction } from "@/types";
import { calculateCardPoints } from "@/lib/calculators/pointCalculator";

interface CardItemProps {
  card: Card;
  onAction: (cardId: string, action: string, increment?: boolean) => void;
  isLastUnique?: boolean;
  showRemove?: boolean;
}

export default function CardItem({
  card,
  onAction,
  isLastUnique = false,
  showRemove = false,
}: CardItemProps) {
  const cardPoints = calculateCardPoints(card);

  const getActionCount = (action: CardAction): number => {
    const actionData = card.actions.find((a) => a.action === action);
    return actionData?.count || 0;
  };

  const getActionButtonClass = (action: CardAction): string => {
    const isAllowed = card.allowedActions.includes(action);
    const baseClass =
      "rounded px-2 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

    if (!isAllowed)
      return `${baseClass} bg-gray-600 text-gray-400 cursor-not-allowed`;

    const colors = {
      epiphany: "bg-purple-600 hover:bg-purple-700 text-white",
      divine_epiphany: "bg-pink-600 hover:bg-pink-700 text-white",
      copy: "bg-blue-600 hover:bg-blue-700 text-white",
      convert: "bg-yellow-600 hover:bg-yellow-700 text-white",
      remove: "bg-red-600 hover:bg-red-700 text-white",
    };

    return `${baseClass} ${colors[action]}`;
  };

  const getCardTypeColor = (): string => {
    const colors = {
      basic: "bg-gray-600",
      unique: "bg-purple-600",
      neutral: "bg-blue-600",
      monster: "bg-red-600",
      forbidden: "bg-orange-600",
    };
    return colors[card.type] || "bg-gray-600";
  };

  return (
    <div className="rounded-md border border-gray-600 bg-gray-700 p-3">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="font-medium text-white">{card.name}</h4>
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold text-white ${getCardTypeColor()}`}
            >
              {card.type.toUpperCase()}
            </span>
            {isLastUnique && (
              <span className="rounded bg-yellow-600 px-2 py-0.5 text-xs font-semibold text-white">
                LAST
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            Rarity: {card.rarity} | Points: {cardPoints}
          </div>
        </div>

        {showRemove && (
          <button
            onClick={() => onAction(card.id, "remove_from_deck")}
            className="ml-2 rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
          >
            Remove
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-3 space-y-2">
        <div className="flex flex-wrap gap-2">
          {(["epiphany", "divine_epiphany"] as CardAction[]).map((action) => {
            const count = getActionCount(action);
            const isAllowed = card.allowedActions.includes(action);

            return (
              <button
                key={action}
                onClick={() => onAction(card.id, action, true)}
                disabled={!isAllowed}
                className={getActionButtonClass(action)}
              >
                {action === "epiphany" ? "Epiphany" : "Divine Epiphany"}
                {count > 0 && ` (${count})`}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {(["copy", "convert", "remove"] as CardAction[]).map((action) => {
            const count = getActionCount(action);
            const isAllowed = card.allowedActions.includes(action);

            return (
              <div key={action} className="flex items-center gap-1">
                <button
                  onClick={() => onAction(card.id, action, false)}
                  disabled={!isAllowed || count === 0}
                  className={`${getActionButtonClass(action)} ${
                    count === 0 ? "opacity-50" : ""
                  }`}
                >
                  -
                </button>
                <button
                  onClick={() => onAction(card.id, action, true)}
                  disabled={!isAllowed}
                  className={getActionButtonClass(action)}
                >
                  {action.charAt(0).toUpperCase() + action.slice(1)}
                  {count > 0 && ` (${count})`}
                </button>
                <button
                  onClick={() => onAction(card.id, action, true)}
                  disabled={!isAllowed}
                  className={getActionButtonClass(action)}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Display active actions */}
      {card.actions.length > 0 && (
        <div className="mt-2 border-t border-gray-600 pt-2">
          <div className="text-xs text-gray-400">
            <strong>Actions:</strong>
            {card.actions.map((action, idx) => (
              <span key={idx} className="ml-2">
                {action.action}({action.count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
