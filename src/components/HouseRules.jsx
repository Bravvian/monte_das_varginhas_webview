import useLanguage from '../hooks/useLanguage';

const RULES = [
  { icon: 'fa fa-paw', variant: 'ok', titleKey: 'rule1t', subKey: 'rule1s' },
  { icon: 'fa fa-ban', variant: 'no', titleKey: 'rule2t', subKey: 'rule2s' },
  { icon: 'fa fa-couch', variant: 'info', titleKey: 'rule3t', subKey: 'rule3s' },
  { icon: 'fa fa-sign-in-alt', variant: 'info', titleKey: 'rule4t', subKey: 'rule4s' },
  { icon: 'fa fa-users', variant: 'info', titleKey: 'rule5t', subKey: 'rule5s' },
  { icon: 'fa fa-calendar-check', variant: 'ok', titleKey: 'rule6t', subKey: 'rule6s' },
];

export default function HouseRules() {
  const { t } = useLanguage();
  return (
    <section id="rules">
      <div className="container">
        <div className="tag">{t('rules_tag')}</div>
        <h2 className="stitle">{t('rules_title')}</h2>
        <div className="rules-g">
          {RULES.map((rule) => (
            <div className="rule-card" key={rule.titleKey}>
              <div className={`rule-icon ${rule.variant}`}><i className={rule.icon}></i></div>
              <div className="rule-txt">
                <strong>{t(rule.titleKey)}</strong>
                <span>{t(rule.subKey)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
