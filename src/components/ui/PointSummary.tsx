"use client";

import { PointBreakdown, SaveDataTier } from "@/types";

interface PointSummaryProps {
  breakdown: PointBreakdown;
  tier: SaveDataTier;
}

export default function PointSummary({ breakdown, tier }: PointSummaryProps) {
  const isOverLimit = breakdown.total > tier.maxPoints;
  const remaining = tier.maxPoints - breakdown.total;

  const summaryItems = [
    {
      label: "Character Cards",
      value: breakdown.characterCards,
      color: "text-purple-400",
    },
    { label: "Deck Cards", value: breakdown.deckCards, color: "text-blue-400" },
    {
      label: "Epiphanies",
      value: breakdown.epiphanies,
      color: "text-pink-400",
    },
    {
      label: "Divine Epiphanies",
      value: breakdown.divineEpiphanies,
      color: "text-pink-500",
    },
    { label: "Copies", value: breakdown.copies, color: "text-cyan-400" },
    {
      label: "Conversions",
      value: breakdown.conversions,
      color: "text-yellow-400",
    },
    { label: "Removals", value: breakdown.removals, color: "text-red-400" },
    {
      label: "Forbidden Cards",
      value: breakdown.forbidden,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="sticky top-4 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Point Summary</h2>

      {/* Point Breakdown */}
      <div className="mb-4 space-y-2">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{item.label}:</span>
            <span className={`font-semibold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Total Points */}
      <div className="mb-4 border-t border-gray-600 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">Total Points:</span>
          <span
            className={`text-2xl font-bold ${
              isOverLimit ? "text-red-500" : "text-green-500"
            }`}
          >
            {breakdown.total}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-gray-400">Max Points (Tier {tier.level}):</span>
          <span className="font-semibold text-gray-200">{tier.maxPoints}</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div
        className={`rounded-md p-4 ${
          isOverLimit
            ? "border border-red-500 bg-red-900/20"
            : "border border-green-500 bg-green-900/20"
        }`}
      >
        {isOverLimit ? (
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <span className="font-bold text-red-400">Over Limit!</span>
            </div>
            <p className="text-sm text-red-300">
              You are {Math.abs(remaining)} points over the limit. Faint
              Memories may be removed at random until under the cap.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="font-bold text-green-400">Within Limit</span>
            </div>
            <p className="text-sm text-green-300">
              You have {remaining} points remaining before reaching the limit.
            </p>
          </div>
        )}
      </div>

      {/* Save Data Rules Summary */}
      <div className="mt-4 rounded-md bg-gray-700 p-3 text-xs text-gray-300">
        <h3 className="mb-2 font-semibold text-white">Quick Reference:</h3>
        <ul className="space-y-1">
          <li>• Fates: Not saved</li>
          <li>• Vivid Memories: Always saved</li>
          <li>• Faint Memories: May not save if over limit</li>
          <li>• Common Card: +20 pts</li>
          <li>• Monster Card: +80 pts</li>
          <li>• Epiphany: +0/+10 pts (depends on card)</li>
          <li>• Divine Epiphany: +20 pts</li>
          <li>• Copy: +0 first, then +10/30/50/70...</li>
          <li>• Remove: +0 first, varies after</li>
          <li>• Convert: +10 pts</li>
          <li>• Forbidden: +20 pts (guaranteed save)</li>
        </ul>
      </div>
    </div>
  );
}
