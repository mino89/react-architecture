const Row: React.FC<{
  children: React.ReactNode;
  enableHover?: boolean;
  onClick?: () => void;
}> = ({ children, onClick, enableHover }) => {
  return (
    <tr
      className={`${enableHover ? "hover-row" : ""}`}
      onClick={() => (onClick ? onClick() : null)}
    >
      {children}
    </tr>
  );
};

export default Row;
