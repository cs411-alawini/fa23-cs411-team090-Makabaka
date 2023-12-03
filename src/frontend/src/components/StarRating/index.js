import React from "react";

// Star Component
function Star({ marked, starId }) {
    return (
        <span star-id={starId} style={{ color: "#ff9933" }} role="button">
            {/* Empty star, Filled star */}
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
}

// star rating
function StarRating(props) {
    // score display
    const [rating, setRating] = React.useState(
        typeof props.rating == "number" ? props.rating : 0
    );
    // effect change with mouse
    const [selection, setSelection] = React.useState(0);
    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute("star-id"))
            val = event.target.getAttribute("star-id");
        setSelection(val);
    };
    return (
        <div
            // effect change with mouse
            onMouseOut={() => hoverOver(null)}
            // click to choose score
            onClick={event =>
                setRating(event.target.getAttribute("star-id") || rating)
            }
            onMouseOver={hoverOver}
            >
            {/* create 5 stars */}
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                starId={i + 1}
                key={`star_${i + 1} `}
                marked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
        </div>
    );
}

export default function main(props) {
    return  <div>
                <StarRating rating={props.rating} />
            </div>;
  }
