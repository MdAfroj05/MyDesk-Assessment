import { useId } from 'react'
import { ModalBase } from './ModalBase'
import type { ModalType } from '../../context/ModalContext'

interface InfoConfig {
  title: string
  subtitle: string
  sections: { heading: string; body: string }[]
}

const content: Record<string, InfoConfig> = {
  changelog: {
    title: 'Changelog',
    subtitle: "What's new in MyDesk",
    sections: [
      {
        heading: 'v0.9.0 — Beta · August 2026',
        body: 'Initial open beta release. Core features: project management, sprint boards, deployment tracking, and the Desk AI assistant. Git integration with GitHub and GitLab. Basic test result surfacing.',
      },
      {
        heading: 'v0.8.0 — Internal Preview · July 2026',
        body: 'Added real-time deployment pipeline view. Introduced environment health cards. Branch-level deployment controls. Improved task-to-commit linking.',
      },
      {
        heading: 'v0.7.0 — Alpha · June 2026',
        body: 'Sprint planning module. Task board with drag-and-drop. Milestone tracking. First version of the Desk AI assistant for commit analysis.',
      },
    ],
  },
  roadmap: {
    title: 'Roadmap',
    subtitle: 'Where MyDesk is headed',
    sections: [
      {
        heading: 'Q3 2026 — Now shipping',
        body: 'Open beta launch. Core workspace features: projects, sprints, tasks, deployments. GitHub & GitLab integration. Desk AI assistant for commit analysis.',
      },
      {
        heading: 'Q4 2026 — Upcoming',
        body: 'Team collaboration features: mentions, comments on tasks, shared views. Slack and Linear import. Improved deployment diff view. Custom dashboard layouts.',
      },
      {
        heading: '2027 — Planned',
        body: 'Mobile app for on-the-go monitoring. Advanced analytics and custom reports. SSO and enterprise auth. Webhook system for custom integrations. On-premise deployment option.',
      },
    ],
  },
  docs: {
    title: 'Documentation',
    subtitle: 'Everything you need to get started',
    sections: [
      {
        heading: 'Quick Start',
        body: 'Create a workspace, connect your Git provider, and import your first project in under 5 minutes. MyDesk auto-detects your repository structure and suggests a sprint setup based on your open issues.',
      },
      {
        heading: 'Connecting Git',
        body: 'MyDesk supports GitHub, GitLab, and Bitbucket. Authorize via OAuth, select your organization, and choose which repositories to link. Commits, branches, and pull requests are synced automatically.',
      },
      {
        heading: 'Deployment Tracking',
        body: 'Add the MyDesk webhook to your CI/CD pipeline. MyDesk will receive build events and surface status, logs, and diffs directly alongside the tasks that triggered the deployment.',
      },
    ],
  },
  api: {
    title: 'API Reference',
    subtitle: 'Build on top of MyDesk',
    sections: [
      {
        heading: 'REST API',
        body: 'MyDesk provides a REST API for all core resources: workspaces, projects, tasks, sprints, and deployments. Authentication uses personal access tokens or OAuth 2.0 for server-to-server use.',
      },
      {
        heading: 'Webhooks',
        body: 'Subscribe to workspace events and receive real-time HTTP POST payloads. Events include: task.created, task.updated, deployment.started, deployment.completed, sprint.started, sprint.closed.',
      },
      {
        heading: 'Rate Limits',
        body: 'Free tier: 1,000 requests/hour. Pro: 10,000 requests/hour. Enterprise: custom limits. All limits are applied per access token. Rate limit headers are returned on every response.',
      },
    ],
  },
  status: {
    title: 'System Status',
    subtitle: 'MyDesk service health',
    sections: [
      {
        heading: '✅ All systems operational',
        body: 'All MyDesk services are running normally. No incidents or degraded performance reported in the last 30 days.',
      },
      {
        heading: 'Services monitored',
        body: 'API Gateway · Authentication · Workspace Service · Git Sync Service · Deployment Tracker · Desk AI · Webhook Delivery · Web App · CDN',
      },
      {
        heading: 'Uptime (last 90 days)',
        body: 'API: 99.97% · Web App: 99.98% · Git Sync: 99.94% · Deployment Tracker: 99.96%\n\nFor real-time updates, subscribe to our status page notifications.',
      },
    ],
  },
  blog: {
    title: 'Blog',
    subtitle: 'Thoughts on developer tooling and workflow',
    sections: [
      {
        heading: 'Why we built MyDesk',
        body: 'Most development teams use 6–10 different tools to ship software. We asked: what if one focused workspace could hold the whole loop from planning to production? That question became MyDesk.',
      },
      {
        heading: 'The problem with context switching',
        body: 'Every tab switch, Slack search, and status update carries a hidden cost. We wrote about the cognitive overhead of fragmented developer workflows and how consolidation improves focus and delivery speed.',
      },
      {
        heading: 'Designing for the deployment moment',
        body: 'Deployments are high-stakes. We explored what information developers actually need at the moment of release, and how surfacing the right context at the right time reduces anxiety and post-deploy incidents.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How MyDesk handles your data',
    sections: [
      {
        heading: 'Data we collect',
        body: 'We collect account information (name, email), workspace data you create, Git metadata you choose to sync (commits, branches, PR titles), and usage data to improve the product. We do not read your source code.',
      },
      {
        heading: 'How we use it',
        body: 'Your data is used to operate MyDesk, provide support, send product updates (which you can opt out of), and improve the service. We do not sell personal data to third parties.',
      },
      {
        heading: 'Your rights',
        body: 'You can request a copy of your data, correct inaccuracies, or delete your account at any time from workspace settings. Deletion removes all associated data within 30 days.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'The rules for using MyDesk',
    sections: [
      {
        heading: 'Using MyDesk',
        body: 'MyDesk is provided for legitimate software development work. You may not use the service for illegal activity, to infringe intellectual property, or to attempt unauthorized access to systems.',
      },
      {
        heading: 'Your content',
        body: 'You own the data and content you create in MyDesk. By using the service, you grant MyDesk a limited license to store and process your content to provide the service.',
      },
      {
        heading: 'Service availability',
        body: 'We aim for high availability but do not guarantee uninterrupted service. MyDesk is provided "as is" during the beta period. Enterprise plans include SLA commitments.',
      },
    ],
  },
  security: {
    title: 'Security',
    subtitle: 'How we protect your workspace',
    sections: [
      {
        heading: 'Infrastructure',
        body: 'MyDesk runs on SOC 2 Type II certified infrastructure. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use isolated tenant environments to prevent data leakage between workspaces.',
      },
      {
        heading: 'Authentication',
        body: 'Passwords are hashed using bcrypt. We support OAuth 2.0 for Git provider login. Two-factor authentication is available on all plans. Enterprise plans support SAML SSO.',
      },
      {
        heading: 'Responsible disclosure',
        body: 'If you discover a security vulnerability, please report it to security@mydesk.dev. We commit to acknowledging reports within 48 hours and resolving critical issues within 7 days.',
      },
    ],
  },
}

interface InfoModalProps {
  type: Exclude<ModalType, 'signin' | 'signup' | 'pricing' | 'dashboard' | null>
}

export function InfoModal({ type }: InfoModalProps) {
  const headingId = useId()
  const config = content[type]

  if (!config) return null

  return (
    <ModalBase labelId={headingId} maxWidth="max-w-lg">
      <div className="px-7 pt-7 pb-7 max-h-[80vh] overflow-y-auto scrollbar-thin">
        <div className="mb-6 pr-6">
          <h2 id={headingId} className="text-xl font-bold text-white mb-1">{config.title}</h2>
          <p className="text-sm text-surface-500">{config.subtitle}</p>
        </div>

        <div className="space-y-5">
          {config.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold text-surface-200 mb-1.5">{section.heading}</h3>
              <p className="text-sm text-surface-500 leading-relaxed whitespace-pre-line">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-surface-800">
          <p className="text-[11px] text-surface-700">
            MyDesk is a fictional product created for an assessment. This content is for demonstration purposes only.
          </p>
        </div>
      </div>
    </ModalBase>
  )
}
