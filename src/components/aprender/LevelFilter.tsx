import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export type Level = "fundamentos" | "pratica" | "alta_performance" | "especialista-fii" | "especialista-acao" | "especialista-rf";

interface LevelFilterProps {
  selectedLevel: Level | null;
  onLevelChange: (level: Level | null) => void;
}

const levels = [
  { id: "fundamentos" as Level, label: "Fundamentos" },
  { id: "pratica" as Level, label: "Prática" },
  { id: "alta_performance" as Level, label: "Alta Performance" },
  { id: "especialista-fii" as Level, label: "FIIs" },
  { id: "especialista-acao" as Level, label: "Ações" },
  { id: "especialista-rf" as Level, label: "Renda Fixa" },
];

export function LevelFilter({ selectedLevel, onLevelChange }: LevelFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap gap-2 mb-8"
    >
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
          {/* Removi o <span> que tinha o emoji e o mr-2 aqui */}
          {level.label}
        </Button>
      ))}
    </motion.div>
  );
}
