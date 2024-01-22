

export default function Layout({
    children,
    addReferenceModal,
    addPrevPaperModal
}: {
    children: React.ReactNode,
    addReferenceModal: React.ReactNode,
    addPrevPaperModal: React.ReactNode
}) {

    return (
        <>
            {children}
            {addReferenceModal}
            {addPrevPaperModal}
        </>
    )
}