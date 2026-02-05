import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Estilo padronizado com a Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Espaço seguro para aprender</span>
          </motion.div>

          {/* Main heading - Ajustado para remover o espaçamento excessivo */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white"
          >
            Domine seu dinheiro <br className="hidden md:block" />
            <span className="text-gradient-hero">antes que ele domine você.</span>
          </motion.h1>

          {/* Subtext - Refinado para ser mais direto e acolhedor */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Descomplique seus investimentos com explicações claras e sem jargões. 
            O ponto de partida ideal para sua liberdade financeira.
          </motion.p>

          {/* CTA Buttons - Arredondados e com maior impacto visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap
