import { caringSections } from '../data/content.js'
import SectionCard from './SectionCard.jsx'
import ContentItem from './ContentItem.jsx'

// The six "Caring for…" wellness chapters from the book.
export default function CaringSections() {
  return (
    <div className="space-y-5">
      {caringSections.map((section) => (
        <SectionCard
          key={section.id}
          accent={section.accent}
          icon={section.icon}
          title={section.title}
          subtitle={section.intro}
        >
          <ul className="space-y-2">
            {section.items.map((item) => (
              <ContentItem key={item.topic} item={item} />
            ))}
          </ul>
        </SectionCard>
      ))}
    </div>
  )
}
