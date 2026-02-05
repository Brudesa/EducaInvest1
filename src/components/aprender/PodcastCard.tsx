import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Play, Clock, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aula } from "@/lib/termosData"; // Importando a tipagem nova

interface PodcastCardProps {
  aula: Aula; // Agora o card recebe os dados da aula
}

export function PodcastCard({ aula }: PodcastCardProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="w-full">
      <motion.div
        key={aula.id} // Chave para animar quando mudar de aula
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 text-foreground shadow-2xl"
      >
        {/* Decorações de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon Box */}
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
            <Headphones className="w-10 h-10 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                aula.nivel === 'iniciante' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                aula.nivel === 'intermediario' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                'bg-rose-500/10 text-rose-500 border-rose-500/20'
              }`}>
                {aula.nivel}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {aula.duracao}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold mb-2 text-foreground leading-tight">
              {aula.titulo}
            </h3>
            
            <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              {aula.descricao}
            </p>
            
            {/* Controles */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-8"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Ouvir Aula {aula.id}
              </Button>

              <Button 
                variant="ghost" 
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-muted-foreground hover:text-primary gap-2"
              >
                <FileText className="w-4 h-4" />
                {showTranscript ? "Ocultar Texto" : "Ler Transcrição"}
                {showTranscript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Área de Transcrição Expansível */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 mt-6 border-t border-white/10">
                <div 
                  className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground max-w-none"
                  // Aqui injetamos o HTML que criamos no termosData
                  dangerouslySetInnerHTML={{ __html: aula.transcricaoCompleta }} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
