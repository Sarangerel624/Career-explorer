"use client";

import { useEffect, useState } from "react";

type Question = {
  id: string;
  text: string;
  order: number;
  category: string;
};

const categories = [
  "Realistic",
  "Investigative",
  "Artistic",
  "Social",
  "Enterprising",
  "Conventional",
];

const QUESTIONS_PER_CATEGORY = 8;

const Page = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  // API-аас бүх асуултыг нэг дор дуудна
  const getQuestions = async () => {
    const res = await fetch("http://localhost:3000/api/questions");
    if (res.ok) {
      const data = await res.json();
      setAllQuestions(data);
    }
  };

  // category болон question update хийх
  useEffect(() => {
    if (!allQuestions.length) return;

    const category = categories[currentCategoryIndex];
    const categoryQuestions = allQuestions.filter(
      (q) => q.category === category
    );

    const start = questionIndex;
    const end = start + QUESTIONS_PER_CATEGORY;
    setCurrentQuestions(categoryQuestions.slice(start, end));
  }, [allQuestions, currentCategoryIndex, questionIndex]);

  useEffect(() => {
    getQuestions();
  }, []);

  const handleNext = () => {
    const category = categories[currentCategoryIndex];
    const categoryQuestions = allQuestions.filter(
      (q) => q.category === category
    );

    if (questionIndex + QUESTIONS_PER_CATEGORY < categoryQuestions.length) {
      setQuestionIndex(questionIndex + QUESTIONS_PER_CATEGORY);
    } else if (currentCategoryIndex + 1 < categories.length) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setQuestionIndex(0);
    } else {
      alert("All questions completed!");
    }
  };

  return (
    <div>
      <h2>Category: {categories[currentCategoryIndex]}</h2>
      <ul>
        {currentQuestions.map((q) => (
          <li key={q.id}>{q.text}</li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Page;
