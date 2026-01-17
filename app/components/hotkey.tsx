interface HotKeyProps {
  keys: string[];
  description: string;
}

export const HotKey = ({ keys, description }: HotKeyProps) => {
  return (
    <div className="flex items-center gap-2 text-focusly-medium text-focusly-text-primary">
      {keys.map((key, index) => (
        <div key={`Hotkey-${key}`} className="flex items-center">
          <p className="cursor-default border border-focusly-text-secondary p-2 text-focusly-text-secondary hover:opacity-50">
            {key}
          </p>
          {index < keys.length - 1 && (
            <span className="ml-2 text-focusly-text-secondary">+</span>
          )}
        </div>
      ))}
      <p>{description}</p>
    </div>
  );
};
