import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';
export const Route = createFileRoute('/notices')({
 head: () => ({meta: [{title:'Notices | R2WMS'},{name:'description',content:'Notices for the R2WMS mechanics community browser demo.'},{property:'og:title',content:'Notices | R2WMS'},{property:'og:description',content:'R2WMS notices member portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AssociationApp,
});
