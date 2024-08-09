import { ColorVariant } from '@/styles/colorVariants';

export interface IUser {
	sub: string;
	name: string;
	email: string;
	avatarName: string;
	avatarColor: ColorVariant;
	noteGroups: string[];
}

export interface UserUpd {
	name: string;
	avatarColor: ColorVariant;
	noteGroups: string[];
}
