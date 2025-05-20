import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionHistory } from "@/components/transaction-history"

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <TransactionHistory />
    </DashboardLayout>
  )
}
