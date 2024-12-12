import { useState } from 'react';

export default function OpenResponse({ question, onAnswer }: any) {
    const [answer, setAnswer] = useState(question.answer || '');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setAnswer(value);
        onAnswer(value); // Send the answer back to ActiveQuiz
    };

    return (
        <div>
            <textarea
                value={answer}
                onChange={handleChange}
                style={{ height: '100px', width: '800px' }}
            ></textarea>
        </div>
    );
}
