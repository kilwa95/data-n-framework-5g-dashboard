interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-[#050505] dark:text-white">
        {title}
      </h1>
    </div>
  );
};
