interface ButtonProps {
  icon?: React.ReactNode;
}

export const Button = ({ icon }: ButtonProps) => {
  return (
    <button
      aria-label="Settings"
      className="flex h-10 w-10 cursor-pointer items-center justify-center transition-colors duration-200 hover:opacity-50"
    >
      {icon && icon}
    </button>
  );
};
