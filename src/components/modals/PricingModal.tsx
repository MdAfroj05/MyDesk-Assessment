import { useId } from 'react'
import { Check, Zap } from 'lucide-react'
import { ModalBase } from './ModalBase'
import { useModal } from '../../context/ModalContext'

interface Plan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
  badge?: string
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'For solo developers exploring MyDesk.',
    cta: 'Get started free',
    highlighted: false,
    features: [
      '1 workspace',
      'Up to 3 projects',
      'Basic task tracking',
      'Git integration',
      '7-day activity history',
    ],
  },
  {
    name: 'Pro',
    price: '$18',
    period: 'per seat / month',
    description: 'For teams shipping software together.',
    cta: 'Start free trial',
    highlighted: true,
    badge: 'Most popular',
    features: [
      'Unlimited projects',
      'Sprint planning & boards',
      'Deployment tracking',
      'Test result integration',
      'Forge AI assistant',
      '90-day history',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For larger teams with advanced needs.',
    cta: 'Contact sales',
    highlighted: false,
    features: [
      'Everything in Pro',
      'SSO & SAML',
      'Custom roles & permissions',
      'Audit logs',
      'SLA & dedicated support',
      'On-premise option',
    ],
  },
]

export function PricingModal() {
  const { openModal } = useModal()
  const headingId = useId()

  return (
    <ModalBase labelId={headingId} maxWidth="max-w-3xl">
      <div className="px-6 pt-8 pb-7">
        <div className="text-center mb-8 pr-6">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">Pricing</p>
          <h2 id={headingId} className="text-2xl font-bold text-white">Simple, honest pricing</h2>
          <p className="text-sm text-surface-500 mt-2">No hidden fees. Cancel any time.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-5 flex flex-col ${
                plan.highlighted
                  ? 'bg-brand-500/10 border-2 border-brand-500/40'
                  : 'bg-surface-800/40 border border-surface-700/60'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-brand-500 text-white">
                  <Zap className="w-2.5 h-2.5" aria-hidden="true" />
                  {plan.badge}
                </span>
              )}

              <div className="mb-4">
                <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Free' && plan.price !== 'Custom' && (
                    <span className="text-[10px] text-surface-600">/ seat / mo</span>
                  )}
                </div>
                <p className="text-[10px] text-surface-600">{plan.period}</p>
                <p className="text-xs text-surface-400 mt-2 leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-2 flex-1 mb-5" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-brand-400' : 'text-surface-500'}`} aria-hidden="true" />
                    <span className="text-[11px] text-surface-400 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => openModal(plan.name === 'Enterprise' ? 'signin' : 'signup')}
                className={`w-full text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-surface-700/60 hover:bg-surface-700 text-surface-200 border border-surface-600'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-surface-700 mt-5">
          All plans include a 14-day free trial of Pro features. No credit card required.
        </p>
      </div>
    </ModalBase>
  )
}
