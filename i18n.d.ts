import en from './messages/en.json';

type Messages = typeof en;

type AllPossibleKeys = NestedKeyOf<Messages>;
type ValidKeys = MessageKeys<Messages, AllPossibleKeys>;

declare global {
	interface IntlMessages extends Messages {}

	type NestedKeyOf<ObjectType> = {
		[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Record<string, any>
			? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
			: `${Key}`;
	}[keyof ObjectType & string];

	type TranslationKeys = ValidKeys;
}
