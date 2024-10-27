'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { UserAvatar } from '@/components/ui/UserAvatar';
import { Locale } from '@/configs/i18n.config';
import { useTaskModal } from '@/hooks/useTaskModal';
import { Comment } from '@/types/comment.interface';
import { formatDate } from '@/utils/helpers/formatDate';

import { CommentForm } from './CommentForm';

type CommentItemProps = {
	comment: Comment;
	userId?: string;
	isAdmin?: boolean;
	isMenu?: boolean;
	onEdit?: (commentId: string, edited: string) => void;
	onRemove?: (commentId: string) => void;
};

export const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	userId,
	isAdmin,
	isMenu,
	onRemove,
	onEdit,
}) => {
	const t = useTranslations();
	const { _id, content, user, author, task, createdAt, updatedAt } = comment;
	const { onOpen } = useTaskModal();

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleEdit = (edited: string) => {
		if (comment.content !== edited && onEdit) {
			onEdit(_id, edited);
		}
		setIsEditing(false);
	};

	const handleRemove = () => {
		if (onRemove) {
			onRemove(_id);
		}
	};

	const openTaskModal = () => {
		onOpen(task._id);
	};

	const isEdited = new Date(updatedAt) > new Date(createdAt);

	return (
		<li className="flex flex-row w-full items-start gap-2 py-2">
			<UserAvatar
				size="sm"
				avatarName={user.initials || author.initials}
				avatarColor={user.avatar || author.avatar}
			/>
			<div className="flex w-full flex-col gap-1 text-sm">
				<div className="flex flex-row flex-wrap gap-1 items-center">
					<p className="text-wrap text-sm">
						<span className="font-medium">{user.name ? user.name : author.name}</span>
						{isMenu && (
							<>
								<span>{t('activity.on')}</span>
								<span
									className="font-medium text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer"
									onClick={openTaskModal}
								>
									{task.title}
								</span>
							</>
						)}
					</p>
					<span className="text-tiny opacity-80">
						{formatDate(createdAt, t('locale.current') as Locale, 'short')}
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
						<span className="text-wrap break-words p-2 bg-default-200 rounded-lg shadow-md">
							{content}
						</span>
						{!isMenu && (
							<div className="flex flex-row mt-1 gap-2">
								{author._id === userId && (
									<button
										className="text-foreground hover:text-primary transition-colors text-tiny"
										onClick={() => setIsEditing(true)}
									>
										{t('actions.edit')}
									</button>
								)}
								{(isAdmin || author._id === userId) && (
									<Popover placement="bottom" offset={0}>
										<PopoverTrigger>
											<button className="text-foreground hover:text-primary transition-colors text-tiny">
												{t('actions.remove')}
											</button>
										</PopoverTrigger>
										<PopoverContent className="p-2">
											<Button variant="solid" color="danger" onPress={handleRemove}>
												{t('actions.delete')}?
											</Button>
										</PopoverContent>
									</Popover>
								)}
							</div>
						)}
					</>
				)}
			</div>
		</li>
	);
};
