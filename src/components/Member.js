export default function Member(props) {
  const convertISOToDateString = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(isoString)
    return date.toLocaleDateString(undefined, options)
  }
  const formattedDateString = convertISOToDateString(props.created_at)

  return (
    <div className="flex justify-center">
      <button className="btn btn-ghost">
        Account created:
        <div className="badge badge-secondary">{formattedDateString}</div>
      </button>
    </div>
  )
}
