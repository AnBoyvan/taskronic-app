import { ColorVariant } from '@/styles/colorVariants';

export interface IUser {
	sub: string;
	name: string;
	email: string;
	avatarName: string;
	avatarColor: ColorVariant;
	noteGroups: string[];
}

export interface IUserUpd {
	name: string;
	avatarColor: ColorVariant;
	noteGroups: string[];
}
