import { VisualEditsMessenger } from "orchids-visual-edits";

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <VisualEditsMessenger />
    </>
  );
}