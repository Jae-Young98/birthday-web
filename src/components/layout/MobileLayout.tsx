export default function MobileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto min-h-screen max-w-[430px] bg-white">
            {children}
        </div>
    );
}