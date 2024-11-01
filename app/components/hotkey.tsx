interface HotKeyProps {
  keys: string[];
  description: string;
}

export const HotKey = ({ keys, description }: HotKeyProps) => {
  return (
    <div className="text-focusly-medium flex items-center gap-2">
      {keys.map((key, index) => (
        <div key={`Hotkey-${key}`} className="flex items-center">
          <p className="text-focusly-text-gray border-focusly-text-gray cursor-default border p-2 hover:opacity-50">
            {key}
          </p>
          {index < keys.length - 1 && (
            <span className="text-focusly-text-gray ml-2">and</span>
          )}
        </div>
      ))}
      <p>{description}</p>
    </div>
  );
};
