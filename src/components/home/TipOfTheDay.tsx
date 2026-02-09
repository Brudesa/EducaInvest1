import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Share2, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Tip {
  id: number;
  title: string;
  content: string;
}

export function TipOfTheDay() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchTips() {
      try {
        const { data, error } = await supabase
          .from('tips')
          .select('*')
          .order('id');

        if (error) throw error;

        if (data && data.length > 0) {
          setTips(data);

          // Deterministic "Tip of the Day" based on date
          const today = new Date();
          const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
          const dailyIndex = dayOfYear % data.length;

          setCurrentIndex(dailyIndex);
        }
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTips();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleShare = () => {
    if (!currentTip) return;

    const textToShare = `💡 Dica do dia EducaInvest:\n\n*${currentTip.title}*\n"${currentTip.content}"\n\nAprenda mais em: educainvest.app`;

    if (navigator.share) {
      navigator.share({
        title: 'Dica do dia EducaInvest',
        text: textToShare,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(textToShare);
      toast({
        title: "Copiado!",
        description: "Dica copiada para a área de transferência.",
      });
    }
  };

  if (isLoading) return null; // Component validation handles empty state subtly
  if (tips.length === 0) return null;

  const currentTip = tips[currentIndex];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Inspiração Diária</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              Sabedoria Financeira
            </h2>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-primary/20 to-purple-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-white/5 pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-2xl"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-400 mb-6 font-display">
                      {currentTip.title}
                    </h3>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed italic mb-8">
                      "{currentTip.content}"
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    className="rounded-full w-12 h-12 border-white/10 hover:bg-white/5 hover:text-white transition-all"
                    aria-label="Dica anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <div className="text-sm font-mono text-slate-500 w-16 text-center">
                    {currentIndex + 1} / {tips.length}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    className="rounded-full w-12 h-12 border-white/10 hover:bg-white/5 hover:text-white transition-all"
                    aria-label="Próxima dica"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  <div className="w-px h-8 bg-white/10 mx-2" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="gap-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-full px-4"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
