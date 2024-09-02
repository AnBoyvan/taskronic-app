export const listColors = {
	default: {
		color: 'bg-background',
		text: 'text-foreground',
	},
	slate: {
		color: 'bg-slate-500',
		text: 'text-[#fafafa]',
	},
	gray: {
		color: 'bg-gray-500',
		text: 'text-[#fafafa]',
	},
	zinc: {
		color: 'bg-zinc-500',
		text: 'text-[#fafafa]',
	},
	stone: {
		color: 'bg-stone-500',
		text: 'text-[#fafafa]',
	},
	red: {
		color: 'bg-red-600',
		text: 'text-[#fafafa]',
	},
	orange: {
		color: 'bg-orange-500',
		text: 'text-[#27272A]',
	},
	amber: {
		color: 'bg-amber-500',
		text: 'text-[#27272A]',
	},
	lime: {
		color: 'bg-lime-500',
		text: 'text-[#27272A]',
	},
	green: {
		color: 'bg-green-500',
		text: 'text-[#27272A]',
	},
	emerald: {
		color: 'bg-emerald-500',
		text: 'text-[#27272A]',
	},
	teal: {
		color: 'bg-teal-500',
		text: 'text-[#27272A]',
	},
	cyan: {
		color: 'bg-cyan-500',
		text: 'text-[#27272A]',
	},
	sky: {
		color: 'bg-sky-500',
		text: 'text-[#27272A]',
	},
	blue: {
		color: 'bg-blue-600',
		text: 'text-[#fafafa]',
	},
	purple: {
		color: 'bg-purple-500',
		text: 'text-[#fafafa]',
	},
	fuchsia: {
		color: 'bg-fuchsia-500',
		text: 'text-[#18181B]',
	},
	pink: {
		color: 'bg-pink-500',
		text: 'text-[#27272A]',
	},
	rose: {
		color: 'bg-rose-500',
		text: 'text-[#18181B]',
	},
} as const;

export type ListColor = keyof typeof listColors;
