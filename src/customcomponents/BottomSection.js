import React from 'react'

function BottomSection() {
    return (
        <>
            <div className="bottom-section">
                <div className="input-container">
                    <input
                        className="input-value"
                        name="question"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <div id="submit" onClick={getMessages}>
                        ➢
                    </div>
                </div>
                <p className="info">
                    ChatGPT Mar 23 Version. Free Research Preview. ChatGPT may produce
                    inaccurate information about people, places, or facts.
                </p>
            </div>
        </>
    )
}

export default BottomSection