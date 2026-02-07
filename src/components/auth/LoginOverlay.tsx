import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Trophy, Zap, ArrowRight, Star } from "lucide-react";

export function LoginOverlay() {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-[4px] p-4 transition-all duration-500">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="relative max-w-md w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl"
      >
        {/* Efeito de Glow no Topo do Card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 p-8 flex flex-col items-center text-center space-y-6">
          
          {/* --- ÍCONE DE CADEADO PREMIUM --- */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center shadow-lg ring-1 ring-white/5 group-hover:scale-105 transition-transform duration-500">
               <Lock className="w-7 h-7 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
            </div>
          </div>
          
          {/* --- TEXTOS --- */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
              Conteúdo Exclusivo
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Esta trilha é reservada para membros. Entre para desbloquear aulas, salvar seu nível e subir no ranking.
            </p>
          </div>

          {/* --- LISTA DE BENEFÍCIOS (BADGES) --- */}
          <div className="grid grid-cols-2 gap-3 w-full">
             <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                <Trophy className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Ranking & XP</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                <Star className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Certificados</span>
             </div>
          </div>

          {/* --- BOTÕES DE AÇÃO --- */}
          <div className="flex flex-col gap-3 w-full pt-2">
            <Button 
              onClick={() => navigate("/login")}
              size="lg"
              className="w-full h-12 rounded-xl font-bold text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_20px_rgba(var(--primary-rgb),0.25)] hover:shadow-[0_4px_25px_rgba(var(--primary-rgb),0.4)] hover:scale-[1.02] transition-all"
            >
              Liberar Acesso Agora
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-xs text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl h-10"
            >
              Voltar para a Home
            </Button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
