type Props = {
    children: React.ReactNode;
    params: { cardId: string };
}
export default function CardPageLayout({
  children,
  params
}: Props) {
  return (
    <div className="w-full">
        <div>
            {children}
        </div>
    </div>
  )
}
