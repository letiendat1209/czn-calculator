"use client";

import { SaveDataTier } from "@/types";
import { calculateMaxPoints } from "@/lib/constants/points";

interface TierCardProps {
  tier: SaveDataTier;
  onTierChange: (level: number) => void;
}

export default function TierCard({ tier, onTierChange }: TierCardProps) {
  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(e.target.value);
    if (level >= 1 && level <= 50) {
      onTierChange(level);
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Save Data Tier</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="tier-level"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Tier Level
          </label>
          <input
            id="tier-level"
            type="number"
            min="1"
            max="50"
            value={tier.level}
            onChange={handleLevelChange}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-md bg-gray-700 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-300">Formula:</span>
            <span className="font-mono text-sm text-blue-400">
              30 + 10(x - 1)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-200">Max Points:</span>
            <span className="text-2xl font-bold text-green-400">
              {tier.maxPoints}
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-400">
          <p>
            <strong>Note:</strong> Each tier level increases the maximum point
            limit by 10. Nightmare mode and Codex modifiers can boost the Tier.
          </p>
        </div>
      </div>
    </div>
  );
}
