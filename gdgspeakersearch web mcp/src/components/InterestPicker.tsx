import { type Interest, INTEREST_LABELS } from '../data/event'

interface InterestPickerProps {
  selected: Interest[]
  onChange: (interests: Interest[]) => void
}

const ALL_INTERESTS = Object.keys(INTEREST_LABELS) as Interest[]

export default function InterestPicker({ selected, onChange }: InterestPickerProps) {
  const toggle = (interest: Interest) => {
    if (selected.includes(interest)) {
      onChange(selected.filter((i) => i !== interest))
    } else {
      onChange([...selected, interest])
    }
  }

  return (
    <div className="interest-picker">
      <p className="interest-picker-label">What do you want to learn about?</p>
      <div className="interest-grid">
        {ALL_INTERESTS.map((interest) => (
          <button
            key={interest}
            type="button"
            className={`interest-chip${selected.includes(interest) ? ' selected' : ''}`}
            onClick={() => toggle(interest)}
            aria-pressed={selected.includes(interest)}
          >
            {INTEREST_LABELS[interest]}
          </button>
        ))}
      </div>
    </div>
  )
}
