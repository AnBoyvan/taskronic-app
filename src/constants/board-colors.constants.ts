export const boardColors = {
	default: 'bg-default-300',
	blue: 'bg-blue-300',
	purple: 'bg-purple-300',
	green: 'bg-green-300',
	red: 'bg-red-300',
	pink: 'bg-pink-300',
	yellow: 'bg-yellow-200',
	cyan: 'bg-cyan-900',
	zinc: 'bg-zinc-500',
	stone: 'bg-stone-800',
	fuchsia: 'bg-fuchsia-900',
	indigo: 'bg-indigo-900',
	gradient1: 'bg-gradient-to-br from-blue-700 to-blue-900',
	gradient2: 'bg-gradient-to-br from-pink-400 to-pink-200',
	gradient3: 'bg-gradient-to-br from-teal-700 to-cyan-900',
	gradient4: 'bg-gradient-to-br from-cyan-200 via-blue-200 to-blue-400',
	gradient5: 'bg-gradient-to-br from-yellow-200 via-green-300 to-stone-400',
	gradient6: 'bg-gradient-to-br from-teal-200 via-cyan-300 to-blue-400',
	gradient7: 'bg-gradient-to-br from-blue-100 to-blue-300',
	gradient8: 'bg-gradient-to-br from-purple-600 to-purple-900',
	gradient9: 'bg-gradient-to-br from-zinc-700 via-stone-600 to-gray-800',
	gradient10: 'bg-gradient-to-br from-yellow-200 to-red-200',
	gradient11: 'bg-gradient-to-br from-red-700 via-pink-800 to-fuchsia-900',
	gradient12: 'bg-gradient-to-br from-green-700 via-teal-800 to-cyan-900',
} as const;

export type BoardColor = keyof typeof boardColors;
