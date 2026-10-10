import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';
export const Route = createFileRoute('/membership')({
 head: () => ({meta: [{title:'Membership | R2WMS'},{name:'description',content:'Membership for the R2WMS mechanics community browser demo.'},{property:'og:title',content:'Membership | R2WMS'},{property:'og:description',content:'R2WMS membership member portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AssociationApp,
});
