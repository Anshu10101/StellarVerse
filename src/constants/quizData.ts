export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const spaceQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which planet in our solar system has the most moons?",
    options: ["Mars", "Saturn", "Jupiter", "Uranus"],
    correctAnswer: 2,
    explanation: "Jupiter has the most moons with 95 confirmed moons orbiting the gas giant."
  },
  {
    id: 2,
    question: "What is the name of the force that keeps planets in orbit around the Sun?",
    options: ["Electromagnetic force", "Gravitational force", "Nuclear force", "Centrifugal force"],
    correctAnswer: 1,
    explanation: "Gravitational force, discovered by Sir Isaac Newton, keeps planets in their orbits around the Sun."
  },
  {
    id: 3,
    question: "What is the name of the galaxy that contains our solar system?",
    options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
    correctAnswer: 1,
    explanation: "Our solar system is located in the Milky Way galaxy, which contains billions of other stars."
  },
  {
    id: 4,
    question: "What phenomenon causes the northern and southern lights?",
    options: ["Solar flares", "Solar wind", "Meteor showers", "Lunar reflection"],
    correctAnswer: 1,
    explanation: "The aurora (northern and southern lights) is caused by solar wind particles interacting with Earth's magnetic field."
  },
  {
    id: 5,
    question: "How long does it take for light from the Sun to reach Earth?",
    options: ["8 minutes", "1 hour", "24 hours", "1 second"],
    correctAnswer: 0,
    explanation: "It takes approximately 8 minutes for light to travel from the Sun to Earth, at a speed of 299,792 kilometers per second."
  }
]; 