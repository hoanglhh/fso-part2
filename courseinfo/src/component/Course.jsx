const Course = ({ course }) => {
  return (
    <div>
      <Header course = {course} />
      <Content parts={course.parts} />        
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
      <h2>{course.name}</h2>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce(
  (sum, part) => sum + part.exercises, 0)
  return <strong>total of {total} exercises</strong>
}

export default Course