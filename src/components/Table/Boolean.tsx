export const Boolean: React.FC<{ value: boolean }> = ({ value }) => {
  return <td>{value ? "🔴" : "🟢"}</td>;
};
