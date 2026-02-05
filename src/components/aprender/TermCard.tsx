import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  Lightbulb,
  Percent,      
  TrendingUp,   
  Landmark,     
  BarChart3,    
  ShieldCheck,  
  Zap,          
  Brain,
  Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";

interface TermCardProps {
  term: Termo;
  hideLevel?: boolean;
}

export function TermCard({ term, hideLevel = false }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Lógica dos Ícones
  const getTermIcon = (t: Termo) => {
    const nome = t.nome.toLowerCase();
    if (nome.includes("reserva")) return ShieldCheck;
    if (nome.includes("liquidez")) return Zap;
    if (nome.includes("juros")) return TrendingUp;
    if (nome.includes("tesouro")) return Landmark;
    if (nome.includes("bolsa") || nome.includes("ações")) return BarChart3;

    switch (t.categoria) {
      case 'taxas': return Percent;
      case 'indicadores': return TrendingUp;
      case 'renda_fixa': return Landmark;
      case 'renda_variavel': return BarChart3;
      default: return Coins;
    }
  };

  const Icon = getTermIcon(term);

  // Cores da borda baseadas no nível (sutil)
  const borderColor = 
    term.nivelId === 'iniciante' ? 'group-hover:border-emerald-500/30' :
    term.nivelId === 'intermediario' ? 'group-hover:border-amber-500/30' :
    'group-hover:border-rose-500/30';

  return (
    <div className="h-full"> {/* Mantemos o wrapper, mas o card interno será h-fit */}
      <motion.div 
        layout="position"
        className={`bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all group ${borderColor} ${isExpanded ? 'ring-1 ring-primary/30 bg-slate-900/60' : ''}`}
      >
        <div className="p-5">
          <div className="flex justify-between items-start gap-4 mb-3">
            <div className="flex items-center gap-3">
              {/* Ícone Restaurado e Estilizado */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-primary shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{term.sigla}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{term.nome}</p>
              </div>
            </div>

            {!hideLevel && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border bg-white/5 border-white/10 text-muted-foreground`}>
                {term.nivelId}
              </span>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {term.explicacaoSimplificada}
            </p>
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
                   <div className="pt-1">
                    <span className="text-emerald-400 font-bold text-xs block mb-1">💡 Dica de Ouro:</span>
                    <p className="text-muted-foreground">{term.dicaComoComecar}</p>
                   </div>
                )}
                
                {term.audioUrl && (
                   <div className="pt-2 flex justify-end">
                     <Button variant="secondary" size="sm" className="h-8 text-xs gap-2 rounded-full">
                       <Volume2 className="w-3 h-3" /> Ouvir explicação
                     </Button>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão de Expandir - Agora é uma barra clicável no fundo */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-1 py-2 text-xs font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
        >
          {isExpanded ? "Menos detalhes" : "Ver mais detalhes"}
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

      </motion.div>
    </div>
  );
}
