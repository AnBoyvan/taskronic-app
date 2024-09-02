import { Base } from './root.interface';

export interface BackgroundImage extends Base {
	usplashId: string;
	author: string;
	link: string;
	thumb: string;
	full: string;
}

export interface ImageDto {
	usplashId: string;
	author: string;
	link: string;
	thumb: string;
	full: string;
}
