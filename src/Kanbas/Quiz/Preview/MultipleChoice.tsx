export default function MultipleChoiceQuestion(
    { question }: { question: { description: string, points: string, answerChoices: { choice: string }[] } }) {

    return (!question ? <p>Invalid Question</p> :
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <ul style={{ listStyleType: 'none' }}>
                {question.answerChoices.map((answerChoiceObj, index) => (
                    <li key={index}>
                        <input type="radio" name="radio-multiple-choice" className="ps-3 me-2" id={`choice-${index}`} />
                        <label htmlFor={`choice-${index}`}>{answerChoiceObj.choice}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}