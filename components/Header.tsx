export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div className="bg-slate-100 px-4 py-2 rounded-xl w-96 flex items-center gap-2">
        <span className="text-slate-400">🔍</span>
        <input type="text" placeholder="Search for jobs..." className="bg-transparent border-none focus:ring-0 text-sm w-full" />
      </div>
      <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm"></div>
    </header>
  );
}
