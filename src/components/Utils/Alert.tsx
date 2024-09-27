export const Alert: React.FC<{ value: boolean }> = ({ value }) => {
  return <>{value ? "🔴" : "🟢"}</>;
};
