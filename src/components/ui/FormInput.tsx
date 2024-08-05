'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Input, type InputProps } from '@nextui-org/react';

import type { icons } from 'lucide-react';

import { Icon } from '@/components/ui/Icon';

export type FormInputProps = {
	name: string;
	icon?: keyof typeof icons;
	control: Control<any, any>;
} & InputProps;

export const FormInput: React.FC<FormInputProps> = ({
	name,
	icon,
	type,
	color,
	autoComplete,
	labelPlacement,
	...props
}) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const startIcon = icon ? <Icon name={icon} /> : null;

	const passNames = ['password', 'confirmPassword', 'newPassword', 'confirmNewPassword'];

	return (
		<Controller
			name={name}
			control={props.control}
			render={({ field, fieldState, formState }) => {
				return (
					<Input
						autoComplete={`new-${name}`}
						{...props}
						id={name}
						labelPlacement={labelPlacement ? labelPlacement : 'outside'}
						isInvalid={!!formState.errors?.[name]?.message}
						color={field.value && !fieldState.invalid ? 'success' : color || 'default'}
						errorMessage={formState.errors?.[name]?.message?.toString()}
						value={field.value}
						onChange={field.onChange}
						type={isVisible ? 'text' : type}
						startContent={startIcon}
						endContent={
							passNames.includes(name) ? (
								<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
									<Icon
										size={24}
										name={isVisible ? 'EyeOff' : 'Eye'}
										className="text-default-400 pointer-events-none"
									/>
								</button>
							) : null
						}
					/>
				);
			}}
		></Controller>
	);
};
