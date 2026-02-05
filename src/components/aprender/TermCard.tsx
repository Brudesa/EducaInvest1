import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  Lightbulb,
  Percent,      // Para Taxas
  TrendingUp,   // Para Indicadores
  Landmark,     // Para Renda Fixa
  BarChart3,    // Para Renda Variável
  ShieldCheck,  // Para Reserva de Emergência
  Zap,          // Para Liquidez
  Brain         // Genérico
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";

interface TermCardProps {
  term: Termo;
  hideLevel?: boolean;
}

export function TermCard({ term, hideLevel = false }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Lógica para escolher o ícone baseado na categoria ou termo específico
  const getTermIcon = (t: Termo) => {
    // 1. Ícones Específicos (para dar mais personalidade aos conceitos chave)
    if (t.nome.toLowerCase().includes("reserva")) return ShieldCheck;
    if (t.nome.toLowerCase().includes("liquidez")) return Zap;
    if (t.nome.toLowerCase().includes("juros compostos")) return TrendingUp;

    // 2. Ícones por Categoria
    switch (t.categoria) {
      case 'taxas': return Percent;
      case 'indicadores': return TrendingUp;
      case 'renda_fixa': return Landmark;
      case 'renda_variavel': return BarChart3;
      case 'conceitos': return Lightbulb;
      default: return Brain;
    }
  };

  const Icon = getTermIcon(term);

  // Cores baseadas no nível (mantidas caso queira usar em bordas ou detalhes)
  const levelColor = 
    term.nivelId === 'iniciante' ? 'text-emerald-500 border-emerald-500/20' :
    term.nivelId === 'intermediario' ? 'text-amber-500 border-amber-500/20' :
    'text-rose-500 border-rose-500/20';

  return (
    <div className="h-full">
      <motion.div 
        layout="position"
        className={`h-full bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all flex flex-col ${isExpanded ? 'ring-1 ring-primary/50' : ''}`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-start gap-4 mb-3">
            <div className="flex items-center gap-3">
              {/* Ícone Restaurado Aqui */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800 border border-white/5 text-primary shadow-inner`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{term.sigla}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{term.nome}</p>
              </div>
            </div>

            {/* Badge de nível (só aparece se não estiver oculto) */}
            {!hideLevel && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${levelColor} bg-white/5`}>
                {term.nivelId}
              </span>
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {term.explicacaoSimplificada}
            </p>
          </div>

          {/* Botão de Expandir/Ocultar */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            {term.audioUrl && (
               <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full hover:bg-white/5">
                 <Volume2 className="w-4 h-4" />
               </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto text-xs h-8 text-primary hover:text-primary/80 hover:bg-primary/10 gap-1 pr-2 pl-3 rounded-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Menos detalhes" : "Ver detalhes"}
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
          </div>
        </div>

        {/* Área Expandida */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-slate-950/30 border-t border-white/5"
            >
              <div className="p-5 space-y-4 text-sm">
                <div>
                  <h4 className="text-primary font-bold mb-1 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <Lightbulb className="w-3 h-3" /> Explicação Técnica
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{term.explicacaoCompleta}</p>
                </div>
                
                {term.exemplo && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="text-white font-bold text-xs block mb-1">Exemplo Prático:</span>
                    <p className="text-muted-foreground italic">"{term.exemplo}"</p>
                  </div>
                )}

                {term.dicaComoComecar && (
                   <div className="pt-2">
                    <span className="text-emerald-400 font-bold text-xs block mb-1">💡 Dica de Ouro:</span>
                    <p className="text-muted-foreground">{term.dicaComoComecar}</p>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
