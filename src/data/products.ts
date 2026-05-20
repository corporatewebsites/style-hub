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
};

export const products: Product[] = [
  { id: "blazer-01", name: "Шерстяной блейзер Nº01", color: "Anthracite Grey", price: 42000, image: blazer, category: "Верхняя одежда", isNew: true },
  { id: "shirt-02", name: "Шёлковая рубашка", color: "Sand Shell", price: 28500, image: shirt, category: "Рубашки" },
  { id: "trousers-03", name: "Брюки со стрелками", color: "Black Graphite", price: 31200, image: trousers, category: "Брюки" },
  { id: "knit-04", name: "Кашемировый джемпер", color: "Raw Cream", price: 38500, oldPrice: 52000, image: knit, category: "Трикотаж", onSale: true },
  { id: "bag-05", name: "Кожаная сумка-тоут", color: "Cognac", price: 64000, image: bag, category: "Аксессуары" },
  { id: "acc-06", name: "Капсула аксессуаров", color: "Mixed", price: 18000, oldPrice: 24000, image: accessories, category: "Аксессуары", onSale: true },
  { id: "blazer-07", name: "Двубортное пальто", color: "Ivory Wool", price: 89000, image: blazer, category: "Верхняя одежда", isNew: true },
  { id: "knit-08", name: "Объёмный свитер косами", color: "Ecru", price: 24500, image: knit, category: "Трикотаж" },
  { id: "shirt-09", name: "Поплиновая рубашка", color: "Optic White", price: 19500, oldPrice: 27000, image: shirt, category: "Рубашки", onSale: true },
];
