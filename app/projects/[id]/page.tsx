import ProjectDetail, { projectMetadata } from "../../experience/ProjectDetail";
import { ALL_PROJECTS } from "../../experience/projects";
export const dynamicParams = false;
export function generateStaticParams(){return ALL_PROJECTS.map(project=>({id:project.id}));}
type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props){const {id}=await params;return projectMetadata(id,"en");}
export default async function Page({params}:Props){const {id}=await params;return <ProjectDetail id={id} locale="en"/>;}
