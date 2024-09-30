import "./Layout.css";

export type LayoutProps = {
  header: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (LayoutProps) => {
  const { header, main, footer } = LayoutProps;
  return (
    <div className="wrapper">
      <header>{header}</header>
      <main>{main}</main>
      <footer>{footer}</footer>
    </div>
  );
};
