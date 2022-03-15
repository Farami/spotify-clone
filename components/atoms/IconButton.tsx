type Props = {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  text: string;
  onClick?: () => void;
};

function IconButton({ icon, text, onClick }: Props) {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 hover:text-white"
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </button>
  );
}

export default IconButton;
