import { OrderWizard } from "@/components/order";

export const metadata = {
  title: "Создать заказ",
};

export default function CreateOrderPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto">
        <OrderWizard />
      </div>
    </div>
  );
}
