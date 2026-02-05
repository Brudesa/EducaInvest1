import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, PauseCircle, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";
import { Level } from "./LevelFilter";

interface TermCardProps {
  term: Termo;
}

const levelLabels: Record<Level, { label: string; color: string; bg: string }> = {
  iniciante: { label: "Iniciante", color: "text-green-700", bg: "bg-green-100" },
  intermediario: { label: "Intermediário", color: "text-yellow-700", bg: "bg-yellow-100" },
  experiente: { label: "Experiente", color: "text-red-700", bg: "bg-red-100" },
};

export function TermCard({ term }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const levelInfo = levelLabels[term.nivelId];

  // Função para tocar o áudio
  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o card feche ao clicar no botão

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Se tiver MP3 usa ele, senão usa a voz do navegador
    if (term.audioUrl) {
      const audio = new Audio(term.audioUrl);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
      setIsSpeaking(true);
    } else {
      const utterance = new SpeechSynthesisUtterance(term.explicacaoSimplificada);
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
      className={`bg-card rounded-xl border shadow-sm transition-all duration-300 ${
        isExpanded ? "border-primary/50 shadow-md" : "border-border hover:border-primary/30"
      }`}
    >
      {/* --- Header (Sempre Visível) --- */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-4 cursor-pointer"
      >
        {/* Ícone com a inicial */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-primary">{term.sigla.charAt(0)}</span>
        </div>

        {/* Textos Principais */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-display font-bold text-lg text-foreground leading-none">
              {term.sigla}
            </h3>
            {/* Tag de Nível */}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${levelInfo.bg} ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
            {/* Tag de Categoria */}
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 uppercase tracking-wider">
              {term.categoria.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{term.nome}</p>
        </div>

        {/* Botão de Áudio Rápido (Header) */}
        <Button
          variant="ghost"
          size="icon"
          className={`shrink-0 rounded-full ${isSpeaking ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary"}`}
          onClick={handlePlayAudio}
        >
          {isSpeaking ? <PauseCircle className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>

        {/* Seta Expandir */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </div>

      {/* --- Conteúdo Expandido --- */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-border/50">
              <div className="pt-4 space-y-5">
                
                {/* 1. Explicação Simplificada */}
                <div>
                  <p className="text-foreground text-base leading-relaxed font-medium">
                    {term.explicacaoSimplificada}
                  </p>
                </div>

                {/* 2. Definição Técnica */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
                    <BookOpen className="w-3 h-3" />
                    Definição Técnica
                  </div>
                  <p className="text-sm text-slate-600 italic">
                    "{term.explicacaoCompleta}"
                  </p>
                </div>

                {/* 3. Exemplo Prático */}
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-700 mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Na Prática
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {term.exemplo}
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
