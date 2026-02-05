import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, PauseCircle, BookOpen, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";
import { Level } from "./LevelFilter";

interface TermCardProps {
  term: Termo;
}

const levelLabels: Record<Level, { label: string; color: string; bg: string }> = {
  iniciante: { label: "Iniciante", color: "text-emerald-700", bg: "bg-emerald-100" },
  intermediario: { label: "Intermediário", color: "text-amber-700", bg: "bg-amber-100" },
  experiente: { label: "Experiente", color: "text-rose-700", bg: "bg-rose-100" },
};

export function TermCard({ term }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const levelInfo = levelLabels[term.nivelId];

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    // Fallback inteligente: se não tiver audioUrl, lê o texto simplificado
    const textToRead = term.explicacaoSimplificada || "Texto não disponível para leitura.";
    
    if (term.audioUrl) {
      const audio = new Audio(term.audioUrl);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
      setIsSpeaking(true);
    } else {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "pt-BR";
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card rounded-xl border transition-all duration-300 overflow-hidden ${
        isExpanded 
          ? "border-primary/40 shadow-lg ring-1 ring-primary/10" 
          : "border-border hover:border-primary/30 hover:shadow-md"
      }`}
    >
      {/* --- HEADER (Clicável) --- */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-start gap-4 cursor-pointer relative group"
      >
        {/* Ícone Sigla */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isExpanded ? "bg-primary text-primary-foreground shadow-md" : "bg-primary/10 text-primary"
        }`}>
          <span className="text-xl font-bold">{term.sigla.charAt(0)}</span>
        </div>

        {/* Info Principal */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className="font-display font-bold text-lg text-foreground leading-none">
              {term.sigla}
            </h3>
            {/* Badges */}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${levelInfo.bg} ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate font-medium">{term.nome}</p>
          
          {/* Prévia do texto (Só aparece se estiver FECHADO) */}
          {!isExpanded && (
            <p className="text-xs text-muted-foreground/70 mt-2 line-clamp-1">
              {term.explicacaoSimplificada}
            </p>
          )}
        </div>

        {/* Controles Direita */}
        <div className="flex flex-col items-end gap-2">
           <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground group-hover:text-primary transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* --- CONTEÚDO EXPANDIDO (Grid Layout) --- */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
          >
            <div className="px-5 pb-6 pt-2 border-t border-border/40 space-y-6">
              
              {/* 1. O Chamarisco (Explicação Simplificada) */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Resumo</span>
                </div>
                <p className="text-base text-foreground font-medium leading-relaxed">
                  {term.explicacaoSimplificada || "Conteúdo simplificado indisponível."}
                </p>
                 {/* Botão de Áudio agora fica aqui, logo abaixo do resumo */}
                 <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlayAudio}
                  className="mt-3 h-8 px-3 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 -ml-2"
                >
                  {isSpeaking ? <PauseCircle className="w-3.5 h-3.5 mr-2 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5 mr-2" />}
                  {isSpeaking ? "Parar áudio" : "Ouvir resumo"}
                </Button>
              </div>

              {/* 2. GRID: Técnica vs Prática (Lado a Lado no Desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Coluna Esquerda: Técnica */}
                <div className="bg-white dark:bg-card p-4 rounded-xl border border-border/60 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/40">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase">Definição Técnica</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{term.explicacaoCompleta || "Definição técnica indisponível."}"
                  </p>
                </div>

                {/* Coluna Direita: Exemplo (Com cor de fundo para destaque) */}
                <div className="bg-blue-50/80 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Na Prática</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {term.exemplo || "Exemplo prático indisponível."}
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
