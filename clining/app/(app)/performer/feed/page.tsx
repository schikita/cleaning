"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CleaningFilters } from "@/components/performer/CleaningFilters";
import { OrderCardSkeleton } from "@/components/performer/OrderCardSkeleton";

// Моковые данные для Беларуси
const orders = [
  {
    id: "1",
    title: "Генеральная уборка 3-комнатной квартиры",
    description:
      "После ремонта, удаление строительной пыли. Мытье окон, балкон, кухня, 2 санузла. Квартира 85 м² на пр. Независимости.",
    category: "Клининг",
    serviceType: "repair",
    budget: 450,
    city: "Минск",
    date: "2024-12-25",
    client: { name: "Анна К.", rating: 4.9 },
    responsesCount: 5,
    urgent: true,
  },
  {
    id: "2",
    title: "Поддерживающая уборка офиса 120 м²",
    description:
      "Еженедельная уборка. Помыть полы, протереть пыль, вынести мусор. Район Московская.",
    category: "Клининг",
    serviceType: "regular",
    budget: 180,
    city: "Минск",
    date: "2024-12-23",
    client: { name: 'ООО "БелТех"', rating: 4.7 },
    responsesCount: 12,
    urgent: false,
  },
  {
    id: "3",
    title: "Химчистка дивана и 2 кресел",
    description:
      "Нужна качественная химчистка мебели. Пятна от кофе и вина. Материал - велюр.",
    category: "Клининг",
    serviceType: "carpet",
    budget: 320,
    city: "Гомель",
    date: "2024-12-24",
    client: { name: "Дмитрий В.", rating: 5.0 },
    responsesCount: 2,
    urgent: true,
  },
  {
    id: "4",
    title: "Мытье окон в коттедже",
    description:
      "Двухэтажный коттедж, окна с обеих сторон. Около 12 окон разного размера.",
    category: "Клининг",
    serviceType: "windows",
    budget: 280,
    city: "Могилев",
    date: "2024-12-26",
    client: { name: "Сергей П.", rating: 4.8 },
    responsesCount: 3,
    urgent: false,
  },
  {
    id: "5",
    title: "Уборка кухни от жира и нагара",
    description:
      "Генеральная чистка кухни: вытяжка, плита, фартук, шкафчики снаружи и внутри.",
    category: "Клининг",
    serviceType: "kitchen",
    budget: 220,
    city: "Брест",
    date: "2024-12-27",
    client: { name: "Марина С.", rating: 4.6 },
    responsesCount: 7,
    urgent: false,
  },
];

interface Filters {
  city: string;
  serviceType: string;
  priceRange: [number, number];
  date: string;
  urgent: boolean;
}

const serviceLabels: Record<string, string> = {
  regular: "Поддерживающая",
  deep: "Генеральная",
  repair: "После ремонта",
  windows: "Окна",
  carpet: "Химчистка",
  kitchen: "Кухня",
};

export default function FeedPage() {
  const [filters, setFilters] = useState<Filters>({
    city: "Все города",
    serviceType: "all",
    priceRange: [50, 2000],
    date: "",
    urgent: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null,
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesCity =
        filters.city === "Все города" || order.city === filters.city;
      const matchesService =
        filters.serviceType === "all" ||
        order.serviceType === filters.serviceType;
      const matchesPrice =
        order.budget >= filters.priceRange[0] &&
        order.budget <= filters.priceRange[1];
      const matchesDate = !filters.date || order.date === filters.date;
      const matchesUrgent = !filters.urgent || order.urgent;

      return (
        matchesCity &&
        matchesService &&
        matchesPrice &&
        matchesDate &&
        matchesUrgent
      );
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex">
        {/* Фильтры */}
        <CleaningFilters filters={filters} onChange={setFilters} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Заказы на уборку
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {isLoading
                  ? "Загрузка заказов..."
                  : `Найдено ${filteredOrders.length} заказов в Беларуси`}
              </p>
            </motion.div>

            {/* Orders List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={`skeleton-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <OrderCardSkeleton />
                      </motion.div>
                    ))
                  : filteredOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <div
                          onClick={() => setSelectedOrder(order)}
                          className="cursor-pointer group"
                        >
                          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-cyan-200 dark:hover:border-cyan-800 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  {order.urgent && (
                                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full">
                                      СРОЧНО
                                    </span>
                                  )}
                                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                                    {order.city}
                                  </span>
                                  <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-xs rounded-full">
                                    {serviceLabels[order.serviceType]}
                                  </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                                  {order.title}
                                </h3>
                              </div>
                              <div className="text-right ml-4 flex-shrink-0">
                                <span className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400 block">
                                  {order.budget}
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                  BYN
                                </span>
                              </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 text-sm sm:text-base">
                              {order.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                  {order.client.name[0]}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-slate-900 dark:text-white truncate">
                                    {order.client.name}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <svg
                                      className="w-4 h-4 text-yellow-400 fill-current"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                      {order.client.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg flex-shrink-0">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  />
                                </svg>
                                <span className="font-medium text-sm">
                                  {order.responsesCount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
              </AnimatePresence>

              {!isLoading && filteredOrders.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-slate-400 dark:text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                    Заказы не найдены
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                    Попробуйте изменить параметры фильтрации
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {selectedOrder.urgent && (
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full">
                          СРОЧНЫЙ ЗАКАЗ
                        </span>
                      )}
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                        {selectedOrder.city}
                      </span>
                      <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-xs rounded-full">
                        {serviceLabels[selectedOrder.serviceType]}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {selectedOrder.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors ml-4 flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 text-slate-500 dark:text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Описание
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedOrder.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        Бюджет
                      </span>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedOrder.budget}{" "}
                        <span className="text-lg">BYN</span>
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        Отклики
                      </span>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedOrder.responsesCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-t border-b border-slate-100 dark:border-slate-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {selectedOrder.client.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {selectedOrder.client.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedOrder.client.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5">
                      Откликнуться на заказ
                    </button>
                    <button className="px-6 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
