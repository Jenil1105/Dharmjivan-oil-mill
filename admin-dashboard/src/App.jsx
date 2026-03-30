import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import AddItemForm from './components/AddItemForm'
import ViewItems from './components/ViewItems'
import Footer from './components/Footer'

function App() {
  const [activeView, setActiveView] = useState('dashboard')

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />
      case 'add-item':
        return <AddItemForm />
      case 'items':
        return <ViewItems setActiveView={setActiveView} />
      default:
        return <Dashboard setActiveView={setActiveView} />
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-8rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(223,37,24,0.16),_transparent_68%)] blur-2xl" />
        <div className="absolute bottom-[-12rem] right-[-8rem] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(247,201,10,0.16),_transparent_70%)] blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <Header activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">{renderContent()}</div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
