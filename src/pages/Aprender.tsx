import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { aulas, listaCompletaTermos } from "@/lib/termosData"; // Importando os dados novos

export default function Aprender() {
  // Estado para controlar qual aula está ativa (começa na 1)
  const [currentAulaId, setCurrentAulaId] = useState(1);

  // Encontra os dados da aula atual baseados no ID
  const currentAula = aulas.find(a => a.id === currentAulaId) || aulas[0];

  // Filtra APENAS os termos que pertencem a essa aula
  const termosDaAula = useMemo(() => {
    return listaCompletaTermos.filter((term) => term.aulaAssociadaId === currentAulaId);
  }, [currentAulaId]);

  // Funções de navegação
  const handleNext = () => {
    if (currentAulaId < aulas.length) setCurrentAulaId(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentAulaId > 1) setCurrentAulaId(prev => prev - 1);
  };

  return (
    <Layout>
      <div className="py-8 md:py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent min-h-screen">
        <div className="container mx-auto px-4">
          
          {/* Header da Trilha */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-md text-primary px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Trilha do Investidor</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              Módulo {currentAula.id}: {currentAula.titulo}
            </h1>
            
            {/* Navegação entre Aulas */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                onClick={handlePrev} 
                disabled={currentAulaId === 1}
                className="rounded-full border-white/10 hover:bg-white/5"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              
              <span className="text-sm text-muted-foreground font-mono">
                {currentAulaId} / {aulas.length}
              </span>

              <Button 
                variant="outline" 
                onClick={handleNext} 
                disabled={currentAulaId === aulas.length}
                className="rounded-full border-white/10 hover:bg-white/5"
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>

          {/* O Card do Podcast (Destaque) */}
          <div className="mb-12 relative z-10 max-w-4xl mx-auto">
            <PodcastCard aula={currentAula} />
          </div>

          {/* Divisor Visual */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Conceitos desta aula
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Grid de Cards (Termos da Aula) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
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
              <div className="col-span-full text-center py-10 text-muted-foreground/50">
                <p>Nenhum termo técnico específico cadastrado para esta aula.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
