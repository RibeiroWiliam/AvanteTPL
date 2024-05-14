export default function ListRoot({ children }) {
  return (
    <div className="w-full mt-6 overflow-scroll rounded-lg shadow">
      <table className="w-full gap-4 table-auto">{children}</table>
    </div>
  );
}
