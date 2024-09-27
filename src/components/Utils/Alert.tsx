export const Alert: React.FC<{ value: boolean }> = ({ value }) => {
  return <td>{value ? "🔴" : "🟢"}</td>;
};
