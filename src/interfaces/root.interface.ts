export interface IBase {
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IMember {
	_id: string;
	name: string;
	email: string;
	avatarName: string;
	avatarColor: string;
}

export interface IMemberDto {
	_id: string;
	name: string;
}
