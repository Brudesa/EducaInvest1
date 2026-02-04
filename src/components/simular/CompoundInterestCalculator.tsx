import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";

interface SimulationResult {
  total: number;
  invested: number;
  interest: number;
  chartData: Array<{
    year: number;
    "Juros Compostos": number;
    "Sem Juros": number;
  }>;
}

export function CompoundInterestCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [months, setMonths] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        "https://eduinvest.app.n8n.cloud/webhook-test/simular-investimento",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valor_investido: monthlyInvestment,
            meses: months,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      
      // Transform API response to chart data format
      // Assuming API returns: { total, invested, interest, data: [...] }
      const chartData = [];
      const totalMonths = months;
      
      // If API returns chart data array, use it; otherwise generate from totals
      if (data.data && Array.isArray(data.data)) {
        for (let i = 0; i < data.data.length; i++) {
          const item = data.data[i];
          chartData.push({
            year: item.year ?? i,
            "Juros Compostos": item.juros_compostos ?? item.total ?? 0,
            "Sem Juros": item.sem_juros ?? item.linear ?? monthlyInvestment * (i * 12),
          });
        }
      } else {
        // Generate basic chart data from totals
        for (let i = 0; i <= totalMonths; i += 12) {
          const progress = i / totalMonths;
          chartData.push({
            year: i / 12,
            "Juros Compostos": Math.round((data.total ?? 0) * progress * (1 + progress * 0.5)),
            "Sem Juros": Math.round((data.invested ?? monthlyInvestment * i)),
          });
        }
      }

      setResults({
        total: data.total ?? data.valor_final ?? 0,
        invested: data.invested ?? data.total_investido ?? monthlyInvestment * months,
        interest: data.interest ?? data.juros ?? (data.total - (monthlyInvestment * months)),
        chartData,
      });

    } catch (error) {
      console.error("Erro ao simular:", error);
      toast.error("Erro ao calcular", {
        description: "Não foi possível obter o resultado da simulação. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="monthly">Valor Investido (mensal)</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Quanto você vai investir todo mês
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              R$
            </span>
            <Input
              id="monthly"
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="pl-10"
            />
          </div>
          <Slider
            value={[monthlyInvestment]}
            onValueChange={([value]) => setMonthlyInvestment(value)}
            min={50}
            max={5000}
            step={50}
            className="mt-2"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="months">Meses</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Por quantos meses você vai investir
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="months"
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
          <Slider
            value={[months]}
            onValueChange={([value]) => setMonths(value)}
            min={6}
            max={480}
            step={6}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground">
            {Math.floor(months / 12)} anos e {months % 12} meses
          </p>
        </div>
      </div>

      {/* Simulate Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSimulate}
          disabled={isLoading}
          size="lg"
          className="bg-gradient-hero text-primary-foreground shadow-glow min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 mr-2" />
              Simular
            </>
          )}
        </Button>
      </div>

      {/* Results - Only show after simulation */}
      {results && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid md:grid-cols-3 gap-4"
          >
            <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground">
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Total Acumulado</span>
              </div>
              <p className="font-display text-3xl font-bold">
                {formatCurrency(results.total)}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Calculator className="w-5 h-5" />
                <span className="text-sm font-medium">Total Investido</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                {formatCurrency(results.invested)}
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2 text-success">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Ganho com Juros</span>
              </div>
              <p className="font-display text-2xl font-bold text-success">
                +{formatCurrency(results.interest)}
              </p>
            </div>
          </motion.div>

          {/* Chart */}
          {results.chartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="font-display font-semibold mb-6">
                📈 A Mágica do Tempo: Juros Compostos vs Sem Juros
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="year" 
                      tickFormatter={(value) => `${value}a`}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <RechartsTooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => `Ano ${label}`}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Juros Compostos"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="Sem Juros"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                A curva azul mostra o poder dos juros compostos trabalhando para você!
              </p>
            </motion.div>
          )}
        </>
      )}

      {/* Initial state message */}
      {!results && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Preencha os valores e clique em <strong>Simular</strong> para ver os resultados</p>
        </div>
      )}
    </div>
  );
}
