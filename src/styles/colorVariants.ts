export const colorVariants = {
	slate: 'bg-slate-500 ring-slate-500 text-[#fafafa]',
	gray: 'bg-gray-500 ring-gray-500 text-[#fafafa]',
	zinc: 'bg-zinc-500 ring-zinc-500 text-[#fafafa]',
	stone: 'bg-stone-500 ring-stone-500 text-[#fafafa]',
	red: 'bg-red-600 ring-red-500 text-[#fafafa]',
	orange: 'bg-orange-500 ring-orange-500 text-[#27272A]',
	amber: 'bg-amber-500 ring-amber-500 text-[#27272A]',
	lime: 'bg-lime-500 ring-lime-500 text-[#27272A]',
	green: 'bg-green-500 ring-green-500 text-[#27272A]',
	emerald: 'bg-emerald-500 ring-emerald-500 text-[#27272A]',
	teal: 'bg-teal-500 ring-teal-500 text-[#27272A]',
	cyan: 'bg-cyan-500 ring-cyan-500 text-[#27272A]',
	sky: 'bg-sky-500 ring-sky-500 text-[#27272A]',
	blue: 'bg-blue-600 ring-blue-500 text-[#fafafa]',
	purple: 'bg-purple-500 ring-purple-500 text-[#fafafa]',
	fuchsia: 'bg-fuchsia-500 ring-fuchsia-500 text-[#18181B]',
	pink: 'bg-pink-500 ring-pink-500 text-[#27272A]',
	rose: 'bg-rose-500 ring-rose-500 text-[#18181B]',
} as const;

export type ColorVariant = keyof typeof colorVariants;
