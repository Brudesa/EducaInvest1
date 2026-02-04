import { Button } from "@/components/ui/button";

type Level = "iniciante" | "intermediario" | "experiente";

interface LevelFilterProps {
  selectedLevel: Level | null;
  onLevelChange: (level: Level | null) => void;
}

const levels = [
  { id: "iniciante" as Level, label: "Iniciante"},
  { id: "intermediario" as Level, label: "Intermediário"},
  { id: "experiente" as Level, label: "Experiente"},
];

export function LevelFilter({ selectedLevel, onLevelChange }: LevelFilterProps) {
  return (
          <Button
        variant={selectedLevel === null ? "default" : "outline"}
        onClick={() => onLevelChange(null)}
        className="rounded-full"
      >
        Todos
      </Button>
      {levels.map((level) => (
        <Button
          key={level.id}
          variant={selectedLevel === level.id ? "default" : "outline"}
          onClick={() => onLevelChange(level.id)}
          className="rounded-full"
        >
          <span className="mr-2">{level.emoji}</span>
          {level.label}
        </Button>
      ))}
    </motion.div>
  );
}
