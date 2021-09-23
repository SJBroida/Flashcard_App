import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function Card({ card }) {
	const history = useHistory();
    const {url} = useRouteMatch();

	async function deleteHandler() {
		const abortController = new AbortController();
        const signal = abortController.signal;

		if (
			window.confirm("Delete this card?\n\nYou will not be able to recover it.")
		) {
			await deleteCard(card.id, signal);
			history.push("/");
		}
		return () => abortController.abort();
	}

	return (
		<div>
			<div className="container mb-5">
				<div className="card" key={card.id} style={{ width: "50rem" }}>
					<div className="card-body">
                        <div className="row">
                            <div className="col">
						        <p className="card-text">{card.front}</p>
                            </div> {/* End of ClassName "col" */}
                            <div className="col">
                                <p className="card-text"> {card.back}</p>
                                <div className="float-right">
                                    <button
                                        className="btn btn-secondary mx-1"
                                        onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
                                    >
                                        <span className="oi oi-pencil mr-1"></span>
                                        Edit
                                    </button> {/* End of Edit Button */}
                                    <button className="btn btn-danger ml-1" onClick={deleteHandler}>
                                        <span className="oi oi-trash"></span>
						            </button>
                                </div> {/* End of ClassName "float-right */}
                            </div> {/* End of ClassName "col" */}
                        </div> {/* End of ClassName "row" */}
					</div> {/* End of ClassName "card-body" */}
				</div> {/* End of ClassName "card*/}
			</div>
		</div>
	);
}

export default Card;