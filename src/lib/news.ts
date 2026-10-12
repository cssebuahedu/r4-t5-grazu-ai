import imgGov from "@/assets/news-governance.jpg";
import imgSec from "@/assets/news-security.jpg";
import imgCol from "@/assets/news-collaboration.jpg";
import imgAna from "@/assets/news-analytics.jpg";

/** Frontend news data layer. Replace `newsSource` with an API call later; consumers only use the helpers below. */
export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  thumbnailUrl: string | null;
  category: string;
  /** ISO date; null when no real publication date exists (demo content). */
  publishedAt: string | null;
  sourceName?: string;
  sourceUrl?: string;
  status: "draft" | "published";
  /** Illustrative placeholder, not a real published article. */
  isDemo?: boolean;
};

const newsSource: NewsArticle[] = [
  {
    id: "N-001",
    slug: "penguatan-tata-kelola-ai-transformasi-digital",
    category: "Tata Kelola AI",
    title: "Penguatan Tata Kelola AI untuk Mendukung Transformasi Digital Indonesia",
    excerpt:
      "Pengembangan tata kelola kecerdasan artifisial menjadi langkah strategis dalam mendorong transformasi digital yang aman, transparan, dan bertanggung jawab.",
    thumbnailUrl: imgGov, publishedAt: null, status: "published", isDemo: true,
  },
  {
    id: "N-002",
    slug: "ekosistem-ai-aman-dan-bertanggung-jawab",
    category: "Keamanan AI",
    title: "Membangun Ekosistem AI yang Aman dan Bertanggung Jawab",
    excerpt:
      "Penguatan keamanan dan manajemen risiko menjadi bagian penting dalam memastikan pemanfaatan teknologi AI yang tepercaya dan berkelanjutan.",
    thumbnailUrl: imgSec, publishedAt: null, status: "published", isDemo: true,
  },
  {
    id: "N-003",
    slug: "kolaborasi-pemerintah-industri-kecerdasan-artifisial",
    category: "Kolaborasi",
    title: "Kolaborasi Pemerintah dan Industri dalam Pengembangan Kecerdasan Artifisial",
    excerpt:
      "Sinergi antara pemerintah, perguruan tinggi, dan sektor industri diharapkan dapat mempercepat pengembangan serta adopsi teknologi AI di Indonesia.",
    thumbnailUrl: imgCol, publishedAt: null, status: "published", isDemo: true,
  },
  {
    id: "N-004",
    slug: "perkembangan-adopsi-ai-indonesia",
    category: "Analitik Nasional",
    title: "Perkembangan Adopsi AI di Indonesia: Peluang dan Tantangan",
    excerpt:
      "Pemantauan perkembangan adopsi kecerdasan artifisial menjadi salah satu dasar dalam merumuskan strategi dan kebijakan transformasi digital nasional.",
    thumbnailUrl: imgAna, publishedAt: null, status: "published", isDemo: true,
  },
];

/** Published articles, newest first; undated items keep their source order after dated ones. */
export function getPublishedNews(limit = 8, source: NewsArticle[] = newsSource): NewsArticle[] {
  return source
    .filter((a) => a.status === "published" && a.slug && a.title)
    .map((a, i) => ({ a, i }))
    .sort((x, y) => {
      const tx = x.a.publishedAt ? Date.parse(x.a.publishedAt) : -Infinity;
      const ty = y.a.publishedAt ? Date.parse(y.a.publishedAt) : -Infinity;
      return ty === tx ? x.i - y.i : ty - tx;
    })
    .slice(0, limit)
    .map(({ a }) => a);
}

export function getNewsBySlug(slug: string) {
  return getPublishedNews(Infinity).find((a) => a.slug === slug);
}

export function formatNewsDate(iso: string | null) {
  if (!iso || Number.isNaN(Date.parse(iso))) return null;
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
