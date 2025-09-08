import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div
      className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 
      bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 bg-[length:200%_200%] animate-gradient-move text-white transition-colors"
    >
      <main className="text-center space-y-10 w-full max-w-4xl flex flex-col items-center content-center">
        <div>
          <h1 className="mb-2 text-6xl sm:text-9xl font-extrabold bg-gradient-to-b from-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-lg">
            DoNow!
          </h1>
          <p className="text-2xl sm:text-4xl font-medium bg-gradient-to-b from-white/80 to-white/20 bg-clip-text text-transparent drop-shadow-md">
            The only todo app to actually hold you accountable
          </p>
        </div>

        {/* Glassmorphic Todo List Container */}
        <TodoList />
      </main>
    </div>
  );
}
