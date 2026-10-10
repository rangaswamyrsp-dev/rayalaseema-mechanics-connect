import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';
export const Route = createFileRoute('/')({
 head: () => ({meta: [{title:'R2WMS | Member Home'}, {name:'description',content:'Rayalaseema Two-Wheeler Mechanics Welfare Seva member community portal.'},{property:'og:title',content:'R2WMS | Member Home'},{property:'og:description',content:'Membership, welfare and association updates for the Rayalaseema mechanics community.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AssociationApp,
});
