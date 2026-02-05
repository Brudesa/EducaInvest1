import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Ghost } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { LevelFilter, Level } from "@/components/aprender/LevelFilter";
import { CategoryFilter, Category } from "@/components/aprender/CategoryFilter";
import { TermCard } from "@/components/aprender/TermCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { listaCompletaTermos } from "@/lib/termosData";

export default function Aprender() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(() => {
    return listaCompletaTermos.filter((term) => {
      const matchesLevel = selectedLevel ? term.nivelId === selectedLevel : true;
      const matchesCategory = selectedCategory === "todos" ? true : term.categoria === selectedCategory;
      const matchesSearch = searchQuery
        ? term.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (term.sigla?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true;

      return matchesLevel && matchesCategory && matchesSearch;
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  const handleLevelChange = (level: Level | null) => {
    setSelectedLevel(level);
    setSelectedCategory("todos");
  };

  return (
    <Layout>
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium tracking-tight">Biblioteca do Investidor</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Aprenda os termos financeiros
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Sem jargões complicados. Aqui você encontra explicações simples, 
              exemplos práticos e pode até ouvir em áudio.
            </p>
          </motion.div>

          <div className="mb-10">
            <PodcastCard />
          </div>

          {/* Área de Filtros e Busca */}
          <div className="flex flex-col gap-6 mb-12">
            
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              {/* Filtro de Nível com Scroll Horizontal no Mobile */}
              <div className="overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <LevelFilter 
                  selectedLevel={selectedLevel} 
                  onLevelChange={handleLevelChange} 
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative w-full md:w-72"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar termo (ex: Selic)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/30 border-border focus:bg-background transition-colors"
                />
              </motion.div>
            </div>

            {/* Filtro
