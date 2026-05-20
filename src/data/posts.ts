import feature from "@/assets/blog-feature.jpg";
import architecture from "@/assets/blog-architecture.jpg";
import fabric from "@/assets/blog-fabric.jpg";

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

export const posts: Post[] = [
  { id: "slow-fashion", title: "Искусство медленной моды", excerpt: "Интервью с креативным директором о том, почему долговечность становится новым символом роскоши в цифровую эпоху.", category: "Интервью", date: "12.05.2024", readTime: "8 мин", image: feature, featured: true },
  { id: "brutalism", title: "Локации: Брутализм в Москве", excerpt: "Архитектурные маршруты, ставшие фоном для съёмок осенней капсулы.", category: "Стиль жизни", date: "02.05.2024", readTime: "5 мин", image: architecture },
  { id: "cashmere-care", title: "Как ухаживать за кашемиром", excerpt: "Простые правила, которые продлят жизнь любимым вещам на годы.", category: "Гайд", date: "28.04.2024", readTime: "4 мин", image: fabric },
  { id: "capsule", title: "Капсульный гардероб 2024", excerpt: "Десять предметов, на которых можно построить любой образ сезона.", category: "Эссе", date: "20.04.2024", readTime: "6 мин", image: architecture },
];
