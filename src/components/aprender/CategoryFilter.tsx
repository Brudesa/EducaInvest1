import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type Category = "todos" | "indicadores" | "renda_fixa" | "renda_variavel" | "taxas" | "conceitos";

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories = [
  { id: "todos", label: "Ver Tudo" },
  { id: "indicadores", label: "Indicadores" },
  { id: "taxas", label: "Taxas e Impostos" },
  { id: "renda_fixa", label: "Renda Fixa" },
  { id: "renda_variavel", label: "Renda Variável" },
  { id: "conceitos", label: "Conceitos Básicos" },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border/40"
    >
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selectedCategory === cat.id ? "secondary" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(cat.id as Category)}
          className={`rounded-md text-xs transition-all h-8 ${
            selectedCategory === cat.id 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" 
              : "bg-secondary/50 text-muted-foreground border-border/50 hover:bg-secondary hover:text-foreground"
          }`}
        >
          {cat.label}
        </Button>
      ))}
    </motion.div>
  );
}
