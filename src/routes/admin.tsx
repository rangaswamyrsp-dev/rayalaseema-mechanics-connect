import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';
export const Route = createFileRoute('/admin')({
 head: () => ({meta: [{title:'Demo Administration | R2WMS'},{name:'description',content:'Demo Administration for the R2WMS mechanics community browser demo.'},{property:'og:title',content:'Demo Administration | R2WMS'},{property:'og:description',content:'R2WMS demo administration member portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AssociationApp,
});
