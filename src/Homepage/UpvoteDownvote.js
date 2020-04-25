import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { withLocalStorage } from "../withStorage";
import cx from "classnames";
import { FORM_FIELDS, VOTE } from "../constants";
const { UP, DOWN } = VOTE;

class UpvoteDownvote extends Component {
  static propTypes = {
    getItemFromStorage: PropTypes.func.isRequired,
    setItemToStorage: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const voteKey = this.getVoteKey(props.entry);

    this.state = {
      voteKey,
      voteValue: props.getItemFromStorage(voteKey),
    };

    this.getVoteKey = this.getVoteKey.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.getEntryVote = this.getEntryVote.bind(this);
  }

  getVoteKey(entry) {
    return `vote_${entry[FORM_FIELDS.STORE_ID]}_${
      entry[FORM_FIELDS.TIMESTAMP]
    }`;
  }

  handleVote(event, voteValue) {
    event.stopPropagation();

    // update local state
    // update local storage
    // make api call

    if (voteValue !== this.state.voteValue) {
      this.setState({ voteValue }, () => {
        this.props.setItemToStorage(this.state.voteKey, voteValue);
      });

      // then make api call
    }
  }

  getEntryVote(entry) {
    return this.props.getItemFromStorage(this.getVoteKey(entry));
  }

  render() {
    const isUp = this.state.voteValue === UP;
    const isDown = this.state.voteValue === DOWN;

    return (
      <div className="d-flex align-items-center mt-2">
        <span className="mr-3">Is this information correct?</span>
        <Button
          variant={isUp ? "outline-success" : "outline-secondary"}
          size="sm"
          className={cx("mr-2 rounded-pill text-xs", {
            "font-weight-bold": isUp,
          })}
          onClick={e => this.handleVote(e, UP)}
        >
          <span className="mr-2">Yes</span>
          <span role="img" aria-label="thumbs up">
            👍
          </span>
        </Button>
        <Button
          variant={isDown ? "outline-success" : "outline-secondary"}
          size="sm"
          className={cx("mr-2 rounded-pill text-xs", {
            "font-weight-bold": isDown,
          })}
          onClick={e => this.handleVote(e, DOWN)}
        >
          <span className="mr-2">No</span>
          <span role="img" aria-label="thumbs down">
            👎
          </span>
        </Button>
      </div>
    );
  }
}

export default withLocalStorage(UpvoteDownvote);