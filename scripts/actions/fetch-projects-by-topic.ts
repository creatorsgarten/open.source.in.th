import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const topic = 'bosf23'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.resolve(__dirname, '../../src/content/ring.generated.json')

async function fetchProjects(): Promise<Repository[]> {
	const url = new URL('https://api.github.com/search/repositories')
	url.searchParams.set('q', `topic:${topic}`)
	url.searchParams.set('per_page', '100')

	const resp = await fetch(url)
	if (!resp.ok) {
		throw new Error(`Failed to fetch projects: ${resp.status} ${await resp.text()}`)
	}
	// TODO: handle case where there are more than 100 results, needs to fetch multiple pages
	const data = (await resp.json()) as SearchRepositoriesResponse
	return data.items
}

function saveProjectsToJSON(projects: Project[]) {
	const data = {
		projects: projects
	}
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

async function main() {
	const repositories = await fetchProjects()
	const projects = repositories.map<Project>((repo) => ({
		name: repo.name,
		repo: repo.html_url,
		description: repo.description
	}))
	saveProjectsToJSON(projects)
}

main()

// ref: https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories
interface Repository {
	id: number
	node_id: string
	name: string
	full_name: string
	private: boolean
	owner: {
		login: string
		id: number
		node_id: string
		avatar_url: string
		gravatar_id: string
		url: string
		html_url: string
		followers_url: string
		following_url: string
		gists_url: string
		starred_url: string
		subscriptions_url: string
		organizations_url: string
		repos_url: string
		events_url: string
		received_events_url: string
		type: string
		site_admin: boolean
	}
	html_url: string
	description: string
	fork: boolean
	url: string
	forks_url: string
	keys_url: string
	collaborators_url: string
	teams_url: string
	hooks_url: string
	issue_events_url: string
	events_url: string
	assignees_url: string
	branches_url: string
	tags_url: string
	blobs_url: string
	git_tags_url: string
	git_refs_url: string
	trees_url: string
	statuses_url: string
	languages_url: string
	stargazers_url: string
	contributors_url: string
	subscribers_url: string
	subscription_url: string
	commits_url: string
	git_commits_url: string
	comments_url: string
	issue_comment_url: string
	contents_url: string
	compare_url: string
	merges_url: string
	archive_url: string
	downloads_url: string
	issues_url: string
	pulls_url: string
	milestones_url: string
	notifications_url: string
	labels_url: string
	releases_url: string
	deployments_url: string
	created_at: string
	updated_at: string
	pushed_at: string
	git_url: string
	ssh_url: string
	clone_url: string
	svn_url: string
	homepage: string
	size: number
	stargazers_count: number
	watchers_count: number
	language: string
	has_issues: boolean
	has_projects: boolean
	has_downloads: boolean
	has_wiki: boolean
	has_pages: boolean
	has_discussions: boolean
	forks_count: number
}

interface SearchRepositoriesResponse {
	total_count: number
	incomplete_results: boolean
	items: Repository[]
}

interface Project {
	name: string
	repo: string
	description: string
}
