interface AvatarButtonProps {
  userName: string;
}

export const AvatarButton = ({ userName }: AvatarButtonProps) => {
  return (
    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
        {userName[0]}
      </div>
    </button>
  );
};
