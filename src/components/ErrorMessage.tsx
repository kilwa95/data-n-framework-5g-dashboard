interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div
      className="mt-3 px-3 py-2 bg-red-50 dark:bg-[#3E2729] 
      text-[13px] text-[#DC3545] dark:text-red-400 rounded-lg
      border-l-4 border-[#DC3545] animate-fadeIn"
    >
      {message}
    </div>
  );
};
