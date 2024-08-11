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
	gradient1: 'bg-gradient-to-br from-blue-700 to-blue-900 ring-blue-900 text-[#fafafa]',
	gradient2: 'bg-gradient-to-br from-pink-400 to-pink-200 ring-pink-400 text-[#27272A]',
	gradient3: 'bg-gradient-to-br from-teal-700 to-cyan-900 ring-cyan-900 text-[#fafafa]',
	gradient4:
		'bg-gradient-to-br from-cyan-200 via-blue-200 to-blue-400 ring-blue-400 text-[#27272A]',
	gradient5:
		'bg-gradient-to-br from-yellow-200 via-green-300 to-stone-400 ring-stone-400 text-[#27272A]',
	gradient6:
		'bg-gradient-to-br from-teal-200 via-cyan-300 to-blue-400 ring-blue-400 text-[#27272A]',
	gradient7: 'bg-gradient-to-br from-blue-100 to-blue-300 ring-blue-300 text-[#27272A]',
	gradient8: 'bg-gradient-to-br from-purple-600 to-purple-900 ring-purple-900 text-[#fafafa]',
	gradient9:
		'bg-gradient-to-br from-zinc-700 via-stone-600 to-gray-800 ring-gray-800 text-[#fafafa]',
	gradient10: 'bg-gradient-to-br from-yellow-200 to-red-200 ring-red-200 text-[#27272A]',
	gradient11:
		'bg-gradient-to-br from-red-700 via-pink-800 to-fuchsia-900 ring-fuchsia-900 text-[#fafafa]',
	gradient12:
		'bg-gradient-to-br from-green-700 via-teal-800 to-cyan-900 ring-cyan-900 text-[#fafafa]',
} as const;

export type ColorVariant = keyof typeof colorVariants;
