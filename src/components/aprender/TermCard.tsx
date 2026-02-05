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
  iniciante: { label: "Iniciante", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  intermediario: { label: "Intermediário", color: "text-amber-400", bg: "bg-amber-400/10" },
  experiente: { label: "Experiente", color: "text-rose-400", bg: "bg-rose-400/10" },
};

export function TermCard({ term }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Proteção caso o dado não venha (evita quebrar a tela)
  const levelInfo = levelLabels[term.nivelId] || levelLabels['iniciante'];

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    // Fallback: lê o texto se não tiver áudio
    const textToRead = term.explicacaoSimplificada || "Texto indisponível";
    
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
      className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
        isExpanded 
          ? "bg-card border-primary/50 shadow-lg ring-1 ring-primary/20" 
          : "bg-card border-border hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {/* --- HEADER (Clicável) --- */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-start gap-4 cursor-pointer relative"
      >
        {/* Ícone Sigla */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isExpanded ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
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
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-transparent ${levelInfo.bg} ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate font-medium">{term.nome}</p>
          
          {/* Prévia do texto (Só aparece se estiver FECHADO) */}
          {!isExpanded && (
            <p className="text-xs text-muted-foreground/60 mt-2 line-clamp-1">
              {term.explicacaoSimplificada}
            </p>
          )}
        </div>

        {/* Seta */}
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
            className="overflow-hidden bg-background/50 border-t border-border/50"
          >
            <div className="px-5 pb-6 pt-4 space-y-6">
              
              {/* 1. O Chamarisco (Explicação Simplificada) */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Resumo</span>
                </div>
                <p className="text-base text-foreground font-medium leading-relaxed">
                  {term.explicacaoSimplificada || "Conteúdo simplificado indisponível."}
                </p>
                
                 {/* Botão de Áudio - Agora com cor viva (Sky-400/Blue) */}
                 <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlayAudio}
                  className="mt-3 h-8 px-3 text-xs text-sky-400 hover:text-sky-300 hover:bg-sky-400/10 -ml-2 transition-colors font-semibold"
                >
                  {isSpeaking ? <PauseCircle className="w-4 h-4 mr-2 animate-pulse" /> : <Volume2 className="w-4 h-4 mr-2" />}
                  {isSpeaking ? "Parar áudio" : "Ouvir explicação"}
                </Button>
              </div>

              {/* 2. GRID: Técnica vs Prática */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Coluna Esquerda: Técnica (Fundo sutil) */}
                <div className="bg-secondary/20 p-4 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/10">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-bold text-muted-foreground uppercase">Definição Técnica</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "{term.explicacaoCompleta || "Definição técnica indisponível."}"
                  </p>
                </div>

                {/* Coluna Direita: Exemplo (Destaque Azulado Sutil) */}
                <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                    <span className="text-xs font-bold text-blue-400 uppercase">Na Prática</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
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
