import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Headphones, 
  Play, 
  Clock, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  BarChart2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aula } from "@/lib/termosData";
import { cn } from "@/lib/utils";

interface PodcastCardProps {
  aula: Aula;
}

export function PodcastCard({ aula }: PodcastCardProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  // 1. Lógica de Cores para Badge (Interno)
  const levelBadgeColor = 
    aula.nivel === 'iniciante' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
    aula.nivel === 'intermediario' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
    'text-rose-400 border-rose-500/20 bg-rose-500/10';

  // 2. Lógica de "Glow" para o Card (Borda e Sombra externa no Hover)
  const glowStyles = 
    aula.nivel === 'iniciante' ? 'hover:border-emerald-500/30 hover:shadow-emerald-500/10' :
    aula.nivel === 'intermediario' ? 'hover:border-amber-500/30 hover:shadow-amber-500/10' :
    'hover:border-rose-500/30 hover:shadow-rose-500/10';

  return (
    <div className="w-full perspective-1000">
      <motion.div
        key={aula.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "group relative overflow-hidden rounded-[32px] transition-all duration-300 ease-out",
          "border border-white/10", // Borda base
          "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950", // Fundo base
          glowStyles, // Aplica a cor do brilho baseada no nível
          "hover:shadow-2xl hover:-translate-y-1.5" // Movimento e Sombra Forte
        )}
      >
        {/* Camada Interna para Efeito de Vidro */}
        <div className="relative p-6 md:p-10 z-10">
            
            {/* Efeito de Glow Atmosférico de Fundo (Mais sutil agora para não brigar com a borda) */}
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              
              {/* --- CAPA DO ÁLBUM (ÍCONE) --- */}
              <div className="group/icon relative w-24 h-24 md:w-32 md:h-32 shrink-0">
                {/* Glow atrás do ícone */}
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover/icon:scale-105 group-hover/icon:-rotate-3">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  <Headphones className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                  
                  {/* Visualizador de Áudio Fake */}
                  <div className="absolute bottom-4 flex gap-1 items-end h-4">
                    <div className="w-1 bg-primary/50 rounded-full animate-[music-bar_1s_ease-in-out_infinite] h-2" />
                    <div className="w-1 bg-primary/50 rounded-full animate-[music-bar_1.2s_ease-in-out_infinite_0.1s] h-4" />
                    <div className="w-1 bg-primary/50 rounded-full animate-[music-bar_0.8s_ease-in-out_infinite_0.2s] h-3" />
                  </div>
                </div>
              </div>

              {/* --- CONTEÚDO DE TEXTO --- */}
              <div className="flex-1 w-full space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm transition-colors", levelBadgeColor)}>
                    {aula.nivel}
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
                    <Clock className="w-3.5 h-3.5" />
                    {aula.duracao} min
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {aula.tituloCompleto || aula.titulo}
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl font-light">
                    {aula.descricao}
                  </p>
                </div>
                
                {/* --- CONTROLES --- */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Button
                    size="lg"
                    className="relative overflow-hidden bg-white text-slate-900 hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-full px-8 h-14 font-bold text-base transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer" />
                    <Play className="w-5 h-5 mr-3 fill-current" />
                    Começar Aula
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="lg"
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="h-14 px-6 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all gap-2 group/btn"
                  >
                    {showTranscript ? <ChevronUp className="w-4 h-4" /> : <FileText className="w-4 h-4 group-hover/btn:text-primary transition-colors" />}
                    <span className="font-medium">{showTranscript ? "Fechar Texto" : "Ler Transcrição"}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* --- ÁREA DE TRANSCRIÇÃO --- */}
            <AnimatePresence>
              {showTranscript && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 mt-8 border-t border-white/10 relative">
                     <div className="absolute top-8 left-0 md:left-8 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent rounded-full opacity-50" />
                     <div className="pl-6 md:pl-12">
                       <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                         <BarChart2 className="w-4 h-4" /> Transcrição do Áudio
                       </h4>
                       <div 
                        className="prose prose-invert prose-p:text-slate-300 prose-p:leading-8 prose-headings:text-white prose-strong:text-white prose-li:text-slate-300 max-w-none font-light"
                        dangerouslySetInnerHTML={{ __html: aula.transcricaoCompleta }} 
                      />
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
