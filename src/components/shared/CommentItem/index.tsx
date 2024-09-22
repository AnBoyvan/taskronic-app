'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { UserAvatar } from '@/components/ui/UserAvatar';
import { Locale } from '@/configs/i18n.config';
import { Comment } from '@/types/comment.interface';
import { formatDate } from '@/utils/helpers/formatDate';

import { CommentForm } from '../CommentForm';

type CommentItemProps = {
	comment: Comment;
	userId?: string;
	isAdmin?: boolean;
	onEdit: (commentId: string, edited: string) => void;
	onRemove: (commentId: string) => void;
};

export const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	userId,
	isAdmin,
	onRemove,
	onEdit,
}) => {
	const t = useTranslations();
	const { _id, content, user, author, createdAt, updatedAt } = comment;

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleEdit = (edited: string) => {
		if (comment.content !== edited) {
			onEdit(_id, edited);
		}
		setIsEditing(false);
	};

	const handleRemove = () => {
		onRemove(_id);
	};

	const isEdited = new Date(updatedAt) > new Date(createdAt);

	return (
		<li className="flex flex-row w-full items-start gap-2 py-2">
			<UserAvatar
				size="sm"
				avatarName={user.avatarName || author.avatarName}
				avatarColor={user.avatarColor || author.avatarColor}
			/>
			<div className="flex w-full flex-col gap-1 text-sm">
				<div className="flex flex-row flex-wrap gap-1 items-center">
					<span className="font-medium">{user.name ? user.name : author.name}</span>
					<span className="text-tiny opacity-80">
						{formatDate(createdAt, t('LocaleSwitcher.current') as Locale, 'short')}
						&nbsp;
						{isEdited && t('common.edited')}
					</span>
				</div>
				{isEditing ? (
					<CommentForm
						current={content}
						isEditing={isEditing}
						onAccept={handleEdit}
						onReject={() => setIsEditing(false)}
					/>
				) : (
					<>
						<span className="text-wrap break-words p-2 bg-default-50 rounded-xl shadow-md">
							{content}
						</span>
						<div className="flex flex-row mt-1 gap-2">
							{author._id === userId && (
								<button
									className="text-foreground hover:text-primary transition-colors text-tiny"
									onClick={() => setIsEditing(true)}
								>
									{t('common.edit')}
								</button>
							)}
							{(isAdmin || author._id === userId) && (
								<Popover placement="bottom" offset={0}>
									<PopoverTrigger>
										<button className="text-foreground hover:text-primary transition-colors text-tiny">
											{t('common.remove')}
										</button>
									</PopoverTrigger>
									<PopoverContent className="p-2">
										<Button variant="solid" color="danger" onPress={handleRemove}>
											{t('comment.delete')}?
										</Button>
									</PopoverContent>
								</Popover>
							)}
						</div>
					</>
				)}
			</div>
		</li>
	);
};
