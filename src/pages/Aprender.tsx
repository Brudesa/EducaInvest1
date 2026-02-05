import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  Layers, 
  PlayCircle, 
  CheckCircle2, 
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { aulas, listaCompletaTermos } from "@/lib/termosData";
import { cn } from "@/lib/utils";

export default function Aprender() {
  const [currentAulaId, setCurrentAulaId] = useState(1);
  
  // Encontra os dados da aula atual
  const currentAula = aulas.find(a => a.id === currentAulaId) || aulas[0];

  // Filtra os termos dessa aula
  const termosDaAula = useMemo(() => {
    return listaCompletaTermos.filter((term) => term.aulaAssociadaId === currentAulaId);
  }, [currentAulaId]);

  const modulos = [
    {
      titulo: "Módulo 1: O Básico Invisível",
      nivel: "iniciante",
      aulas: aulas.filter(a => a.nivel === "iniciante")
    },
    {
      titulo: "Módulo 2: O Mercado",
      nivel: "intermediario",
      aulas: aulas.filter(a => a.nivel === "intermediario")
    },
    {
      titulo: "Módulo 3: Jogo Avançado",
      nivel: "avancado",
      aulas: aulas.filter(a => a.nivel === "avancado")
    }
  ];

  const handleNext = () => {
    if (currentAulaId < aulas.length) setCurrentAulaId(prev => prev + 1);
  };

  return (
    <Layout>
      {/* MUDANÇA 1: Container Principal TRAVADO na altura da tela.
        h-[calc(100vh-80px)]: Altura total da tela MENOS aprox o tamanho do Header (80px).
        overflow-hidden: Impede que a página inteira role.
      */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        
        {/* --- COLUNA 1: MENU LATERAL (SIDEBAR) --- */}
        {/* w-80: Largura fixa no desktop.
            overflow-y-auto: Cria uma barra de rolagem SÓ para o menu se precisar.
            border-r: Linha divisória.
        */}
        <aside className="w-full lg:w-96 bg-slate-900/50 backdrop-blur-md border-r border-white/10 lg:h-full overflow-y-auto shrink-0 z-20">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 text-primary sticky top-0 bg-slate-900/50 backdrop-blur-md py-2 z-10">
              <BookOpen className="w-5 h-5" />
              <h2 className="font-display font-bold text-lg text-white">Cronograma</h2>
            </div>

            <div className="space-y-6">
              {modulos.map((modulo, index) => (
                <div key={index}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                    {modulo.titulo}
                  </h3>
                  <div className="space-y-1">
                    {modulo.aulas.map((aula) => {
                      const isActive = currentAulaId === aula.id;
                      const isCompleted = currentAulaId > aula.id;
                      
                      return (
                        <button
                          key={aula.id}
                          onClick={() => setCurrentAulaId(aula.id)}
                          className={cn(
                            "w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 group",
                            isActive 
                              ? "bg-primary/10 text-primary border border-primary/20" 
                              : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                          )}
                        >
                            {isActive ? (
                              <PlayCircle className="w-4 h-4 shrink-0 animate-pulse" />
                            ) : isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                            )}
                            
                            <span className="line-clamp-1">{aula.id}. {aula.titulo}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- COLUNA 2: CONTEÚDO DA AULA --- */}
        {/* flex-1: Ocupa todo o espaço restante.
            overflow-y-auto: Cria a barra de rolagem SÓ para o conteúdo da aula.
            scroll-smooth: Rolagem suave.
        */}
        <main className="flex-1 h-full overflow-y-auto scroll-smooth relative">
          <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-8 pb-32">
              
              {/* Cabeçalho da Aula */}
              <motion.div
                key={`header-${currentAula.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground mb-4">
                    <span>Aula {currentAula.id} de {aulas.length}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="capitalize text-primary">{currentAula.nivel}</span>
                 </div>
                 <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
                   {currentAula.titulo}
                 </h1>
              </motion.div>

              {/* O Player e Transcrição */}
              <PodcastCard aula={currentAula} />

              {/* Divisor Visual */}
              <div className="flex items-center gap-4 py-4">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Conceitos abordados nesta aula
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* Grid de Termos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {termosDaAula.length > 0 ? (
                  termosDaAula.map((term, index) => (
                    <motion.div
                      key={term.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TermCard term={term} /> 
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full p-8 border border-dashed border-white/10 rounded-xl text-center text-muted-foreground/50">
                    <p>Esta aula foca na teoria e mentalidade, sem termos técnicos específicos.</p>
                  </div>
                )}
              </div>

              {/* Navegação Inferior (Botão Próxima) */}
              <div className="pt-12 border-t border-white/10 flex justify-end">
                <Button 
                    size="lg"
                    onClick={handleNext} 
                    disabled={currentAulaId === aulas.length}
                    className="group bg-white text-slate-900 hover:bg-white/90 font-bold rounded-full px-8 py-6 text-lg shadow-lg shadow-white/5"
                  >
                    {currentAulaId === aulas.length ? "Curso Concluído! 🏆" : "Próxima Aula"}
                    {currentAulaId !== aulas.length && (
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    )}
                </Button>
              </div>

              {/* Footer dentro do scroll da aula */}
              <footer className="text-center text-xs text-muted-foreground/40 pt-12 pb-4">
                <p>© 2026 EducaInvest. Feito com ❤️ para sua liberdade financeira.</p>
              </footer>
          </div>
        </main>

      </div>
    </Layout>
  );
}
