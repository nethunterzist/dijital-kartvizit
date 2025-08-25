import { notFound, redirect } from 'next/navigation';

export default async function VCardPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    // API'ye redirect et
    redirect(`/api/sayfalar/${slug}/vcard`);
}