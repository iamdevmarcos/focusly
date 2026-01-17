import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";

const CommandBar = () => {
  return (
    <KBarPortal>
      <KBarPositioner className="bg-black/40 backdrop-blur-md">
        <KBarAnimator className="flex w-[35rem] flex-col gap-4 overflow-hidden rounded-md border border-[#333636] border-opacity-80 bg-[#1c1c1c]">
          <KBarSearch className="w-full bg-transparent px-6 py-4 text-white placeholder-gray-500 outline-none" />
          <div className="border border-[#333636]" />
          <SearchResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

const SearchResults = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-4 pb-1 pt-3 text-sm uppercase text-gray-500">
            {item}
          </div>
        ) : (
          <div
            className={`flex cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-500 ${
              active ? "bg-gray-800 text-white" : "bg-transparent text-gray-400"
            }`}
          >
            <span>{item.name}</span>
            <kbd className="ml-2 inline-flex gap-2 rounded border border-gray-600 bg-transparent px-2 py-1 text-sm text-focusly-text-primary">
              ⌘
              {item.shortcut?.map((shortKey, index) => {
                return <p key={index}>{shortKey}</p>;
              })}
            </kbd>
          </div>
        )
      }
    />
  );
};

export default CommandBar;
