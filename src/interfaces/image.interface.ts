import { IBase } from './root.interface';

export interface IImage extends IBase {
	usplashId: string;
	author: string;
	link: string;
	thumb: string;
	full: string;
}
