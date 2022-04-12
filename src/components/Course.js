import {  timeParts, hasConflict, timeConflict, terms } from '/Users/alisonpark/Desktop/CS394/good/scheduler/src/utilities/times.js';
import {setData} from '/Users/alisonpark/Desktop/CS394/good/scheduler/src/utilities/firebase.js';
const getCourseMeetingData = course => {
  const meets = prompt('Enter meeting data: MTuWThF hh:mm-hh:mm', course.meets);
  const valid = !meets || timeParts(meets).days;
  if (valid) return meets;
  alert('Invalid meeting data');
  return null;
};

export const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };

  return (
    <div className="card m-1 p-2" 
        style={style}
        onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}
        onDoubleClick={() => reschedule(course, getCourseMeetingData(course))}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets }</div>
      </div>
    </div>
  );
};

export default Course;

const reschedule = async (course, meets) => {
  if (meets && window.confirm(`Change ${course.id} to ${meets}?`)) {
    try {
      await setData(`/courses/${course.id}/meets`, meets);
    } catch (error) {
      alert(error);
    }
  }
};



const getCourseNumber = course => (
    course.id.slice(1, 4)
  );
  

  
const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
  );


export const getCourseTerm = course => (
    terms[course.id.charAt(0)]
  );
