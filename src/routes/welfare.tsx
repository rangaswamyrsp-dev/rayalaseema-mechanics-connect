import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';
export const Route = createFileRoute('/welfare')({
 head: () => ({meta: [{title:'Welfare | R2WMS'},{name:'description',content:'Welfare for the R2WMS mechanics community browser demo.'},{property:'og:title',content:'Welfare | R2WMS'},{property:'og:description',content:'R2WMS welfare member portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AssociationApp,
});
