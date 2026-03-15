import PortfolioSection from "@/components/portfolio/PortfolioSection";
import portfolioData from "@/data/portfolioData.json";
import type { PortfolioData } from "@/components/portfolio/types";

const portfolioContent: PortfolioData = portfolioData;

export default function Home() {
  return (
    <main>
      <PortfolioSection data={portfolioContent} />
    </main>
  );
}
