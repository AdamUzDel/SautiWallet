import { IntegrationTest } from "@/components/integration-test"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">SautiWallet Integration Test</h1>
      <IntegrationTest />
    </div>
  )
}
