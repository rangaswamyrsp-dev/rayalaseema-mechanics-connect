import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';
export const Route = createFileRoute('/payments')({
 head: () => ({meta: [{title:'Payments & Receipts | R2WMS'},{name:'description',content:'Payments & Receipts for the R2WMS mechanics community browser demo.'},{property:'og:title',content:'Payments & Receipts | R2WMS'},{property:'og:description',content:'R2WMS payments & receipts member portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AssociationApp,
});
