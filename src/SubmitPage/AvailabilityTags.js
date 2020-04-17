import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import cx from "classnames";

class AvailabilityTags extends Component {
  static propTypes = {
    onChangeCallback: PropTypes.func,
    sendCheckedTags: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      tags: [
        { tagName: "medecines", checked: false, translationKey: "medecines" },
        { tagName: "groceries", checked: false, translationKey: "groceries" },
        { tagName: "vegetables", checked: false, translationKey: "vegetables" },
        {
          tagName: "meat_and_dairy",
          checked: false,
          translationKey: "meat_and_dairy",
        },
        {
          tagName: "personal_and_homecare",
          checked: false,
          translationKey: "personal_and_homecare",
        },
      ],
      editMode: false,
      newTag: "",
    };
  }

  onTagCheck = tagIndex => {
    this.setState(
      prevState => {
        const currentTag = prevState.tags[tagIndex];
        const updatedTag = { ...currentTag, checked: !currentTag.checked };
        const updatedTagsList = [
          ...prevState.tags.slice(0, tagIndex),
          updatedTag,
          ...prevState.tags.slice(tagIndex + 1),
        ];
        return {
          tags: updatedTagsList,
        };
      },
      () => {
        if (this.props.sendCheckedTags) {
          const checkedTags = this.state.tags.filter(tag => {
            return tag.checked;
          });
          this.props.sendCheckedTags(checkedTags);
        }
      }
    );
  };

  onNewTagValueChange = e => {
    this.setState({ newTag: e.target.value });
  };

  toggleEditMode = () => {
    this.setState(prevState => {
      return { editMode: !prevState.editMode, newTag: "" };
    });
  };

  render() {
    return (
      <div className="availability-tags-wrapper">
        <div className="d-flex flex-wrap ">
          {this.state.tags.map((tag, index) => {
            const isChecked = tag.checked;
            return (
              <div
                key={tag.tagName}
                onClick={() => this.onTagCheck(index)}
                className={cx(
                  "tag border mr-2 mb-2 py-1 px-2 rounded-pill text-capitalize font-weight-bold text-xs",
                  {
                    isChecked: isChecked,
                    "border-secondary": !isChecked,
                    "border-success": isChecked,
                  }
                )}
              >
                {tag.tagName}
              </div>
            );
          })}
          <div
            className="add-new-tag border border-secondary text-secondary text-center rounded-circle"
            onClick={this.toggleEditMode}
          >
            <i className="far fa-plus"></i>
          </div>
        </div>
        {this.state.editMode && (
          <div className="d-flex align-items-center justify-content-between">
            <Form.Control
              type="text"
              onChange={this.onNewTagValueChange}
              value={this.state.newTag}
              placeholder="Add new tag"
            />
            <i className="far fa-check"></i>
            <i className="far fa-times"></i>
          </div>
        )}
      </div>
    );
  }
}

export default AvailabilityTags;
