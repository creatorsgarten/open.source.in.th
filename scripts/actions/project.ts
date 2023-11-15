export interface IProject {
    name: string;
    repo: string;
    description: string;
    languages?: string[];
}

export function fetchProjects(existingProjects: IProject[], newProjects: IProject[]): IProject[] {
    const projects = [...existingProjects];

    for (const project of newProjects) {
        const index = projects.findIndex((x) => x.name === project.name);
        if (index === -1) {
            projects.push(project);
        }
    }

    return projects;
}

export function shuffleProject<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}