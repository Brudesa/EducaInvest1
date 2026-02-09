import { motion } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Tip {
  id: number;
  title: string;
  content: string;
}

export function TipOfTheDay() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          // Pick a random tip initially
          const randomIndex = Math.floor(Math.random() * data.length);
          setCurrentTip(data[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTips();
  }, []);

  const handleNewTip = () => {
    if (tips.length <= 1) return;

    let newTip;
    do {
      const randomIndex = Math.floor(Math.random() * tips.length);
      newTip = tips[randomIndex];
    } while (newTip.id === currentTip?.id);

    setCurrentTip(newTip);
  };

  if (isLoading) return null; // Or a skeleton
  if (!currentTip) return null;

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Dica do Dia</h3>
                  <p className="text-xs text-muted-foreground">Atualizada diariamente</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewTip}
                className="text-muted-foreground hover:text-foreground"
                disabled={tips.length <= 1}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <motion.div
              key={currentTip.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <h4 className="font-display font-semibold text-xl mb-3 text-foreground">
                {currentTip.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {currentTip.content}
              </p>
            </motion.div>

            {/* Indicator dots */}
            <div className="flex justify-center gap-2 mt-6">
              {tips.map((tip) => (
                <button
                  key={tip.id}
                  onClick={() => setCurrentTip(tip)}
                  className={`w-2 h-2 rounded-full transition-colors ${currentTip.id === tip.id ? "bg-warning" : "bg-border"
                    }`}
                  aria-label={`Ver dica ${tip.id}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
