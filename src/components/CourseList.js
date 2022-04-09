import React, { useState, useEffect } from 'react';
import { hasConflict, timeConflict, terms } from '/Users/alisonpark/Desktop/CS394/good/scheduler/src/utilities/times.js';
import Course from './Course.js';

const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm} />
        <div className="course-list">
        { 
          termCourses.map(course =>
            <Course key={ course.id } course={ course }
              selected={selected} setSelected={ setSelected } 
            />) 
        }
        </div>
      </>
    );
  };


const getCourseNumber = course => (
    course.id.slice(1, 4)
  );
  


const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
  );


const TermSelector = ({term, setTerm}) => (
    <div className="btn-group">
    { 
      Object.values(terms).map(value => (
        <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
      ))
    }
    </div>
  );

  const TermButton = ({term, setTerm, checked}) => (
    <>
      <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
        onChange={() => setTerm(term)} />
      <label class="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
      </label>
    </>
  );

const getCourseTerm = course => (
    terms[course.id.charAt(0)]
  );

  export default CourseList;