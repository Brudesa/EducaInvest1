import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { TipOfTheDay } from "@/components/home/TipOfTheDay";
import { DashboardUser } from "@/components/home/DashboardUser"; // Import do novo componente

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);

  useEffect(() => {
    // Busca usuário e perfil para o Dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchPerfil(session.user.id);
      }
    });
  }, []);

  const fetchPerfil = async (userId: string) => {
    const { data } = await supabase.from("perfis").select("*").eq("id", userId).single();
    if (data) setPerfil(data);
  };

  return (
    <Layout>
      {/* SE LOGADO: Dashboard | SE DESLOGADO: HeroSection */}
      {user ? (
        <DashboardUser user={user} perfil={perfil} />
      ) : (
        <HeroSection />
      )}
      
      <QuickActions />
      <TipOfTheDay />
    </Layout>
  );
}
