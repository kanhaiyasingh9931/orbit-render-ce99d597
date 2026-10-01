import TodoApp from '../components/TodoApp';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl">
        <TodoApp />
      </div>
    </main>
  );
}