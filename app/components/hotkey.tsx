interface HotKeyProps {
  keys: string[];
  description: string;
}

export const HotKey = ({ keys, description }: HotKeyProps) => {
  return (
    <div className="flex items-center gap-2 text-focusly-medium">
      {keys.map((key, index) => (
        <div key={`Hotkey-${key}`} className="flex items-center">
          <p className="cursor-default border border-focusly-text-gray p-2 text-focusly-text-gray hover:opacity-50">
            {key}
          </p>
          {index < keys.length - 1 && (
            <span className="ml-2 text-focusly-text-gray">+</span>
          )}
        </div>
      ))}
      <p>{description}</p>
    </div>
  );
};
