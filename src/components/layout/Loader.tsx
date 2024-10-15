import { Logo } from '../svg/Logo';

export const Loader: React.FC = () => {
	return (
		<div className="absolute flex flex-col items-center justify-center top-0 left-0 h-svh w-svw bg-gradient-to-b from-primary-400 to-primary-100 overflow-hidden z-[9999]">
			<div className="w-1/2 animate-pulse">
				<Logo />
			</div>
		</div>
	);
};
