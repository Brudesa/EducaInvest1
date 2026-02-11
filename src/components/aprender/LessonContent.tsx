import { motion } from "framer-motion";
import { Layers, ChevronLeft, ChevronRight, Timer, Info, Lock, CheckCircle2, Trophy, Clock, Play } from "lucide-react";
import { PodcastCard, PodcastCardHandle } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lesson, Term } from "@/lib/types";
import { useState, useEffect, useRef } from "react";

interface LessonContentProps {
    currentAula: Lesson;
    totalLessons: number;
    termosDaAula: Term[];
    handleLessonChange: (id: number) => void;
    currentAulaId: number;
    canComplete: boolean;
    timeLeft: number;
    timeLimit: number;
    handleCompleteAndNext: () => void;
    xpAmount: number;
    isAdmin?: boolean;
    aulaFinalizada?: boolean;
}

const ProgressBar = ({ currentTime, duration, onSeek }: { currentTime: number; duration: number; onSeek: (time: number) => void }) => {
    const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    const progressBarRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || duration <= 0) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const newPercentage = Math.min(Math.max(0, x / width), 1);
        const newTime = newPercentage * duration;

        onSeek(newTime);
    };

    return (
        <div
            ref={progressBarRef}
            className="w-full h-4 flex items-center cursor-pointer group relative"
            onClick={handleClick}
            title="Clique para avançar/voltar"
        >
            {/* Visual Bar */}
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden group-hover:h-2 transition-all duration-300">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary via-blue-500 to-emerald-500 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                >
                    {/* Glow effect at the tip */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            </div>

            {/* Invisble Hit Area for easier clicking */}
            <div className="absolute inset-0 z-10" />
        </div>
    );
};

export function LessonContent({
    currentAula,
    totalLessons,
    termosDaAula,
    handleLessonChange,
    currentAulaId,
    canComplete: initialCanComplete, // Rename to avoid conflict if we override logic locally
    timeLeft: initialTimeLeft,       // Same here
    timeLimit,
    handleCompleteAndNext,
    xpAmount,
    isAdmin = false,
    aulaFinalizada = false
}: LessonContentProps) {

    const scrollbarClass = "lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 lg:[&::-webkit-scrollbar-thumb]:rounded-full hover:lg:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors";

    // Audio State
    const [audioCurrentTime, setAudioCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const podcastRef = useRef<PodcastCardHandle>(null);
    const [localCanComplete, setLocalCanComplete] = useState(initialCanComplete);

    // Sync local completion state with props
    useEffect(() => {
        setLocalCanComplete(initialCanComplete);
    }, [initialCanComplete]);

    const handleAudioTimeUpdate = (current: number, total: number) => {
        setAudioCurrentTime(current);
        // Only update duration if it changes significantly or is 0
        if (total > 0 && Math.abs(audioDuration - total) > 1) {
            setAudioDuration(total);
        }
    };

    const handleAudioEnded = () => {
        // Reset progress bar visually
        setAudioCurrentTime(0);
    };

    const handleSeek = (time: number) => {
        podcastRef.current?.seek(time);
    };

    // Use admin bypass
    const processIsAdmin = isAdmin;

    const finalCanComplete = processIsAdmin || aulaFinalizada || initialCanComplete;

    return (
        <main className={cn(
            "flex-1 relative bg-slate-950/30 lg:h-full lg:overflow-y-auto",
            scrollbarClass
        )}>
            {/* Header Fixo Mobile/Desktop */}
            <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden lg:flex shrink-0 w-8 h-8 rounded-full hover:bg-white/10"
                            onClick={() => handleLessonChange(currentAulaId - 1)}
                            disabled={currentAulaId === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <div className="flex flex-col gap-1 min-w-0">
                            <h2 className="text-sm font-medium text-slate-400 truncate flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5" />
                                Módulo {currentAula.moduloId} • {currentAula.nivel?.toUpperCase()}
                            </h2>
                            <h1 className="text-base font-bold text-white truncate">
                                {currentAula.titulo}
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
                        {/* Barra de Progresso removida conforme solicitado */}
                    </div>

                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <Button
                            variant="glossy"
                            size="sm"
                            onClick={handleCompleteAndNext}
                            disabled={!finalCanComplete}
                            className={cn(
                                "gap-2 transition-all duration-500 font-bold",
                                finalCanComplete
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-100"
                                    : "bg-slate-800/50 text-slate-500 border-slate-700/50 grayscale opacity-80"
                            )}
                        >
                            {aulaFinalizada ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">Concluída</span>
                                    <span className="sm:hidden">Próxima</span>
                                </>
                            ) : finalCanComplete ? (
                                <>
                                    <Trophy className="w-4 h-4 animate-pulse" />
                                    <span className="hidden sm:inline">Finalizar Aula (+{xpAmount} XP)</span>
                                    <span className="sm:hidden">Finalizar</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">
                                        {/* Mostra tempo restante do áudio ou mensagem */}
                                        {audioDuration > 0 ?
                                            `Ouça a aula (${Math.ceil(audioDuration - audioCurrentTime)}s)` :
                                            "Aguarde..."
                                        }
                                    </span>
                                </>
                            )}
                            <ChevronRight className={cn("w-4 h-4 ml-1", finalCanComplete && "animate-bounce-x")} />
                        </Button>
                    </div>
                </div>

                {/* Mobile Progress Bar */}
                {/* Mobile Progress Bar removed */}
                <div className="md:hidden mt-3 pt-2 border-t border-white/5 hidden">
                </div>
            </header>

            <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 pb-32">
                {/* Podcast Card - Agora com Ref e Callbacks */}
                <PodcastCard
                    ref={podcastRef}
                    aula={currentAula}
                    termos={termosDaAula}
                    onTimeUpdate={handleAudioTimeUpdate}
                    onEnded={handleAudioEnded}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {termosDaAula.map((termo) => (
                        <TermCard key={termo.id} termo={termo} />
                    ))}
                </div>

                {termosDaAula.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Nenhum termo específico nesta aula.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
