type Props = {
  count?: number;
};
function Placeholder({ count = 1 }: Props) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex animate-pulse">
          <div className="mx-auto h-3 w-full rounded-lg bg-slate-700 opacity-50"></div>
        </div>
      ))}
    </>
  );
}

export default Placeholder;
