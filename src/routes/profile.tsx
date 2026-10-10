import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';
export const Route = createFileRoute('/profile')({
 head: () => ({meta: [{title:'My Profile | R2WMS'},{name:'description',content:'My Profile for the R2WMS mechanics community browser demo.'},{property:'og:title',content:'My Profile | R2WMS'},{property:'og:description',content:'R2WMS my profile member portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AssociationApp,
});
