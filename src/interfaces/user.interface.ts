export interface IUser {
	sub: string;
	name: string;
	email: string;
	avatarName: string;
	avatarColor: string;
	noteGroups: string[];
}

export interface IUserUpd {
	name: string;
	avatarColor: string;
	noteGroups: string[];
}
