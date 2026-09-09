// Мок-данные для каркаса Админко 2.0.
// Цель: дать реальному UI данные для рендера, чтобы позже заменить
// эти функции на настоящие вызовы API/Prisma без переписывания компонентов.
// Форма объектов ориентируется на модель из "HWS Adminko — справочник по
// архитектуре" и решения из ТЗ/Экранных спецификаций (Entry/Route/Placement,
// AttributeTerm, User и т.д.), где это уже спроектировано.

export type Brand = {
  id: number;
  name: string;
  logoUrl: string | null;
  productCount: number;
};

export type Category = {
  id: number;
  name: string;
  parentId: number | null;
  productCount: number;
  published: boolean;
};

export type Product = {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  priceMin: number;
  priceMax: number;
  published: boolean;
  imageUrl: string | null;
};

export type User = {
  id: number;
  username: string;
  displayName: string;
  email: string | null;
  isBoss: boolean;
  createdAt: string;
};

export type AuditEntry = {
  id: number;
  createdAt: string;
  user: string;
  action: string;
  entityType: string;
  entityName: string | null;
  summary: string | null;
};

export const mockBrands: Brand[] = [
  { id: 1, name: "Sangens", logoUrl: null, productCount: 42 },
  { id: 2, name: "EasySteam", logoUrl: null, productCount: 18 },
  { id: 3, name: "Harvia", logoUrl: null, productCount: 27 },
  { id: 4, name: "Narvi", logoUrl: null, productCount: 9 },
];

export const mockCategories: Category[] = [
  { id: 1, name: "Печи для бани", parentId: null, productCount: 64, published: true },
  { id: 2, name: "Электрические печи", parentId: 1, productCount: 31, published: true },
  { id: 3, name: "Дровяные печи", parentId: 1, productCount: 33, published: true },
  { id: 4, name: "Аксессуары", parentId: null, productCount: 22, published: true },
];

export const mockProducts: Product[] = [
  { id: 1, sku: "SNG-1001", name: "Sangens Cariitti 9 кВт", brand: "Sangens", category: "Электрические печи", priceMin: 640, priceMax: 780, published: true, imageUrl: null },
  { id: 2, sku: "ESM-2002", name: "EasySteam Comfort 6 кВт", brand: "EasySteam", category: "Электрические печи", priceMin: 410, priceMax: 480, published: true, imageUrl: null },
  { id: 3, sku: "HRV-3003", name: "Harvia Legend 240", brand: "Harvia", category: "Дровяные печи", priceMin: 890, priceMax: 890, published: false, imageUrl: null },
  { id: 4, sku: "NRV-4004", name: "Narvi NC-17", brand: "Narvi", category: "Дровяные печи", priceMin: 720, priceMax: 760, published: true, imageUrl: null },
];

export const mockUsers: User[] = [
  { id: 1, username: "boss", displayName: "Андрей", email: "andy@hws.shopping", isBoss: true, createdAt: "2026-05-18" },
  { id: 2, username: "content", displayName: "Марина (контент)", email: "marina@hws.shopping", isBoss: false, createdAt: "2026-09-01" },
];

export const mockAuditLog: AuditEntry[] = [
  { id: 1, createdAt: "2026-09-09T10:12:00Z", user: "boss", action: "product.enable", entityType: "product", entityName: "Sangens Cariitti 9 кВт", summary: "Товар включён" },
  { id: 2, createdAt: "2026-09-09T09:40:00Z", user: "content", action: "post.update", entityType: "post", entityName: "Как выбрать печь для бани", summary: "Публикация обновлена" },
  { id: 3, createdAt: "2026-09-08T18:05:00Z", user: "boss", action: "markup.update", entityType: "setting", entityName: null, summary: "Наценка бренда EasySteam изменена" },
];

export const dashboardStats = {
  productsTotal: mockProducts.length,
  productsPublished: mockProducts.filter((p) => p.published).length,
  categoriesTotal: mockCategories.length,
  brandsTotal: mockBrands.length,
  usersTotal: mockUsers.length,
};
