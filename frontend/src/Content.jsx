import React, { useState, useEffect } from "react";

const workoutSchedule = {
    Monday: {
        exercises: [
            { name: "Jumping Jacks", duration: 10 },
            { name: "Push-Ups", duration: 15 },
            { name: "Squats", duration: 15 },
            { name: "Plank", duration: 5 },
        ],
    },
    Tuesday: {
        exercises: [
            { name: "Running in Place", duration: 10 },
            { name: "Bicycle Crunches", duration: 15 },
            { name: "Lunges", duration: 15 },
            { name: "Cool Down Stretch", duration: 5 },
        ],
    },
    Wednesday: {
        exercises: [
            { name: "Arm Circles", duration: 10 },
            { name: "Bicep Curls", duration: 15 },
            { name: "Triceps Dips", duration: 15 },
            { name: "Push-Ups", duration: 5 },
        ],
    },
    Thursday: {
        exercises: [
            { name: "Yoga Poses", duration: 10 },
            { name: "Breathing Exercises", duration: 10 },
            { name: "Stretching", duration: 10 },
        ],
    },
    Friday: {
        exercises: [
            { name: "Squats", duration: 10 },
            { name: "Deadlifts", duration: 15 },
            { name: "Calf Raises", duration: 15 },
            { name: "Hamstring Stretches", duration: 5 },
        ],
    },
    Saturday: {
        exercises: [
            { name: "High Knees", duration: 10 },
            { name: "Burpees", duration: 15 },
            { name: "Mountain Climbers", duration: 15 },
            { name: "Cooldown Stretch", duration: 5 },
        ],
    },
    Sunday: {
        exercises: [{ name: "Rest & Recovery", duration: 0 }],
    },
};

const Content = () => {
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(workoutSchedule["Monday"].exercises[0].duration * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            nextExercise();
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const nextExercise = () => {
        const exercises = workoutSchedule[selectedDay].exercises;
        if (exerciseIndex < exercises.length - 1) {
            setExerciseIndex(exerciseIndex + 1);
            setTimeLeft(exercises[exerciseIndex + 1].duration * 60);
            speak(exercises[exerciseIndex + 1].name);
        } else {
            setIsRunning(false);
            speak("Workout Completed! Great job!");
        }
    };

    const handleDayChange = (event) => {
        const day = event.target.value;
        setSelectedDay(day);
        setExerciseIndex(0);
        setTimeLeft(workoutSchedule[day].exercises[0].duration * 60);
        setIsRunning(false);
    };

    const startTimer = () => {
        if (timeLeft > 0) {
            setIsRunning(true);
            speak(workoutSchedule[selectedDay].exercises[exerciseIndex].name);
        }
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setExerciseIndex(0);
        setTimeLeft(workoutSchedule[selectedDay].exercises[0].duration * 60);
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">🏋️‍♂️ Workout Timer</h1>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
                <label className="block text-lg font-semibold mb-2">Select a Day:</label>
                <select
                    className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={selectedDay}
                    onChange={handleDayChange}
                >
                    {Object.keys(workoutSchedule).map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>

                <div className="mt-6 text-center">
                    <h2 className="text-2xl font-semibold">{workoutSchedule[selectedDay].exercises[exerciseIndex].name}</h2>
                    <p className="text-lg text-gray-400">
                        Exercise {exerciseIndex + 1} of {workoutSchedule[selectedDay].exercises.length}
                    </p>
                </div>

                {workoutSchedule[selectedDay].exercises[exerciseIndex].duration > 0 && (
                    <div className="mt-6 flex flex-col items-center">
                        <p className="text-4xl font-bold text-green-400">{formatTime(timeLeft)}</p>
                        <div className="mt-4 flex gap-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                                onClick={startTimer}
                            >
                                Start
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                                onClick={stopTimer}
                            >
                                Stop
                            </button>
                            <button
                                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                                onClick={resetTimer}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Content;
