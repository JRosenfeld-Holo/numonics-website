const STATS = [
  { label: "Platinum", value: "2x" },
  { label: "Gold", value: "1x" },
  { label: "Years Active", value: "25" },
];

export default function StatsRow() {
  return (
    <div className="w-full bg-surface-container border-y border-outline-variant relative z-10">
      <div className="max-w-4xl mx-auto flex divide-x divide-outline-variant">
        {STATS.map(({ label, value }) => (
          <div key={label} className="flex-1 flex flex-col items-center justify-center py-8 gap-1">
            <span className="text-3xl md:text-4xl font-black text-primary tracking-tight font-headline">
              {value}
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-on-surface-variant font-label">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
