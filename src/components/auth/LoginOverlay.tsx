import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Trophy, Zap } from "lucide-react";

export function LoginOverlay() {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl text-center space-y-6"
      >
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white font-display">Conteúdo Exclusivo</h2>
          <p className="text-muted-foreground text-sm">
            Para acessar as trilhas de aprendizado, salvar seu progresso e acumular <strong>XP</strong>, você precisa estar logado.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 text-left">
          <div className="flex items-center gap-2 text-[10px] text-white font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-400" /> Salve seu Nível
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-primary" /> Ganhe recompensas
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => navigate("/login")}
            className="w-full h-12 rounded-xl font-bold text-base bg-primary hover:scale-[1.02] transition-transform"
          >
            Entrar ou Criar Conta
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-muted-foreground text-xs"
          >
            Voltar para a Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
