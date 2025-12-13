import "./globals.css";
import MobileLayout from "@/components/layout/MobileLayout";

export const metadata = {
  title: "Happy Birthday " + process.env.TITLE_NAME + "🎂",
  description: "For you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <MobileLayout>
          {children}
        </MobileLayout>
      </body>
    </html>
  );
}