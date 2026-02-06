import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  Layers, 
  PlayCircle, 
  CheckCircle2, 
  Loader2,
  Timer // Novo ícone para o timer
} from "lucide-react";
import confetti from "canvas-confetti"; // Biblioteca de celebração
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"; // Import do Toast para feedback

// Imports do Backend e Tipagem
import { supabase } from "@/integrations/supabase/client"; 
import { Aula, Termo } from "@/lib/termosData"; 

const TIME_LIMIT = 30; // Tempo em segundos para liberar o XP

export default function Aprender() {
  const [currentAulaId, setCurrentAulaId] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Estados para os Dados Reais
  const [lessons, setLessons] = useState<Aula[]>([]);
  const [allTerms, setAllTerms] = useState<Termo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados da Gamificação e Trava
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [canComplete, setCanComplete] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // 1. Buscando dados do Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);

        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .order('order_index', { ascending: true });

        const { data: termsData } = await supabase.from('terms').select('*');

        const mappedLessons: Aula[] = (lessonsData || []).map((l: any) => ({
          id: l.id,
          titulo: l.title_short,
          tituloCompleto: l.title_full,
          nivel: l.level, // Importante: deve ser 'iniciante', 'intermediario', ou 'avancado'
          duracao: l.duration,
          descricao: l.description,
          transcricaoCompleta: l.transcript_html
        }));
        setLessons(mappedLessons);

        const mappedTerms: Termo[] = (termsData || []).map((t: any) => {
           const parentLesson = mappedLessons.find(l => l.id === t.lesson_id);
           return {
             id: t.id,
             sigla: t.acronym,
             nome: t.name,
             explicacaoCompleta: t.explanation_full,
             explicacaoSimplificada: t.explanation_simple,
             exemplo: t.example,
             dicaComoComecar: t.tip,
             nivelId: parentLesson?.nivel || 'iniciante', 
             categoria: t.category,
             aulaAssociadaId: t.lesson_id
           };
        });
        setAllTerms(mappedTerms);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. Lógica do Timer (Reseta ao trocar de aula)
  useEffect(() => {
    setTimeLeft(TIME_LIMIT);
    setCanComplete(false);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAulaId]);

  const currentAula = lessons.find(a => a.id === currentAulaId) || lessons[0];

  // Cálculo do XP baseado na dificuldade
  const getXpReward = (nivel: string) => {
    const rewards: Record<string, number> = {
      'iniciante': 100,
      'intermediario': 300,
      'avancado': 500
    };
    return rewards[nivel?.toLowerCase()] || 100;
  };

  const xpAmount = currentAula ? getXpReward(currentAula.nivel) : 100;

  // 3. Função de Conclusão com XP Dinâmico
  const handleCompleteAndNext = async () => {
    if (!canComplete || !user) return;

    // Efeito de Confete
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#ffffff', '#60a5fa']
    });

    try {
      // Salva progresso (Marca aula como completa)
      const { error: progressError } = await supabase.from('user_progress').upsert({
        user_id: user.id,
        lesson_id: currentAulaId,
        is_completed
