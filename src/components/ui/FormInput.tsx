'use client';

import { ForwardedRef, forwardRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Input, type InputProps } from '@nextui-org/react';

import type { icons } from 'lucide-react';

import { Icon } from '@/components/ui/Icon';

export type FormInputProps = {
	name: string;
	icon?: keyof typeof icons;
	control: Control<any, any>;
} & InputProps;

export const FormInput = forwardRef(
	(
		{ name, icon, type, color, autoComplete, labelPlacement, radius, ...props }: FormInputProps,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		const [isVisible, setIsVisible] = useState(false);

		const toggleVisibility = () => setIsVisible(!isVisible);

		const startIcon = icon ? <Icon name={icon} /> : null;

		const passNames = ['password', 'confirmPassword', 'newPassword', 'confirmNewPassword'];

		return (
			<Controller
				name={name}
				control={props.control}
				render={({ field, fieldState, formState }) => {
					const isValid = fieldState.isDirty && !fieldState.invalid;

					return (
						<Input
							ref={ref}
							autoComplete={`new-${name}`}
							{...props}
							id={name}
							labelPlacement={labelPlacement ? labelPlacement : 'outside'}
							isInvalid={!!formState.errors?.[name]?.message}
							color={isValid ? 'success' : color || 'default'}
							errorMessage={formState.errors?.[name]?.message?.toString()}
							value={field.value}
							onChange={field.onChange}
							type={isVisible ? 'text' : type}
							radius={radius ? radius : 'sm'}
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
	},
);
