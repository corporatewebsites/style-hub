import blazer from "@/assets/product-blazer.jpg";
import shirt from "@/assets/product-shirt.jpg";
import trousers from "@/assets/product-trousers.jpg";
import knit from "@/assets/product-knit.jpg";
import bag from "@/assets/product-bag.jpg";
import accessories from "@/assets/editorial-accessories.jpg";

export type Product = {
  id: string;
  name: string;
  color: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: "Верхняя одежда" | "Трикотаж" | "Рубашки" | "Брюки" | "Аксессуары";
  isNew?: boolean;
  onSale?: boolean;
  description?: string;
  composition?: string;
  sizes?: string[];
  gallery?: string[];
};

const defaultSizes = ["XS", "S", "M", "L", "XL"];
const defaultDescription =
  "Минималистичный силуэт из коллекции LÜMERE. Сдержанная геометрия, натуральные материалы и внимание к каждой детали — предмет, который становится основой капсульного гардероба.";
const defaultComposition = "Шерсть 80%, кашемир 20%. Производство: Италия. Уход: сухая чистка.";

export const products: Product[] = [
  { id: "blazer-01", name: "Шерстяной блейзер Nº01", color: "Anthracite Grey", price: 42000, image: blazer, category: "Верхняя одежда", isNew: true, gallery: [blazer, accessories, shirt], description: "Двубортный блейзер прямого кроя из плотной итальянской шерсти. Подкладка из вискозы, рукав с прорезным карманом, акцентные пуговицы из рога.", composition: "Шерсть 90%, эластан 10%. Подкладка: вискоза. Сделано в Италии.", sizes: defaultSizes },
  { id: "shirt-02", name: "Шёлковая рубашка", color: "Sand Shell", price: 28500, image: shirt, category: "Рубашки", gallery: [shirt, accessories, knit], description: "Лёгкая рубашка из натурального шёлка с мягким воротником-стойкой. Скрытая планка, перламутровые пуговицы.", composition: "Шёлк 100%. Ручная стирка при 30°C.", sizes: defaultSizes },
  { id: "trousers-03", name: "Брюки со стрелками", color: "Black Graphite", price: 31200, image: trousers, category: "Брюки", gallery: [trousers, blazer, accessories], description: "Классические брюки с заутюженными стрелками, высокой посадкой и плавным сужением к низу.", composition: "Шерсть 70%, вискоза 28%, эластан 2%.", sizes: defaultSizes },
  { id: "knit-04", name: "Кашемировый джемпер", color: "Raw Cream", price: 38500, oldPrice: 52000, image: knit, category: "Трикотаж", onSale: true, gallery: [knit, shirt, accessories], description: "Объёмный джемпер из чистого кашемира с круглым вырезом и спущенным плечом.", composition: "Кашемир 100%. Деликатная стирка.", sizes: defaultSizes },
  { id: "bag-05", name: "Кожаная сумка-тоут", color: "Cognac", price: 64000, image: bag, category: "Аксессуары", gallery: [bag, accessories, blazer], description: "Структурированная сумка-тоут из растительно-дублёной кожи. Внутри — съёмный косметичный кошелёк.", composition: "Натуральная кожа 100%. Фурнитура: латунь.", sizes: ["One Size"] },
  { id: "acc-06", name: "Капсула аксессуаров", color: "Mixed", price: 18000, oldPrice: 24000, image: accessories, category: "Аксессуары", onSale: true, gallery: [accessories, bag, shirt], description: "Набор сезонных аксессуаров: шёлковый платок, кожаный ремень и тонкие перчатки.", composition: "Шёлк, кожа, шерсть.", sizes: ["One Size"] },
  { id: "blazer-07", name: "Двубортное пальто", color: "Ivory Wool", price: 89000, image: blazer, category: "Верхняя одежда", isNew: true, gallery: [blazer, trousers, accessories], description: "Объёмное двубортное пальто длины миди из тёплой шерсти альпаки.", composition: "Шерсть 70%, альпака 30%.", sizes: defaultSizes },
  { id: "knit-08", name: "Объёмный свитер косами", color: "Ecru", price: 24500, image: knit, category: "Трикотаж", gallery: [knit, blazer, accessories], description: "Тяжёлый свитер плотной вязки с рельефными косами и высоким воротником.", composition: "Шерсть мериноса 100%.", sizes: defaultSizes },
  { id: "shirt-09", name: "Поплиновая рубашка", color: "Optic White", price: 19500, oldPrice: 27000, image: shirt, category: "Рубашки", onSale: true, gallery: [shirt, blazer, accessories], description: "Базовая поплиновая рубашка прямого кроя с классическим воротником.", composition: "Хлопок 100%.", sizes: defaultSizes },
];

void defaultDescription;
void defaultComposition;
