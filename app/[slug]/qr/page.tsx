import { notFound, redirect } from 'next/navigation';

export default async function QRCodePage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    // API'ye redirect et
    redirect(`/api/qr-codes/${slug}`);
}